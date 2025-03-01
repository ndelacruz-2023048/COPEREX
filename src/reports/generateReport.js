import ExcelJS from 'exceljs'

export const generateReport = async(data)=>{
    try {
        //Crear libro
        const workbook = new ExcelJS.Workbook()
        workbook.creator = 'Nery de la Cruz'
        workbook.created = new Date()

        //Crear hoja
        const worksheet = workbook.addWorksheet('Companies',{
                                                             views:[{state:'frozen',ySplit:1}],
                                                             properties:{tabColor:{argb:'FFC0000'}}
                                                            })
        
        //Crear columnas
        worksheet.columns = [
            {header:'Name',key:'name',width:27},
            {header:'Direction',key:'direction',width:50},
            {header:'Company Size',key:'companySize',width:20},
            {header:'WebSite',key:'webSite',width:39},
            {header:'ImpactLevel',key:'impactLevel',width:20},
            {header:'Years Of Trajectory',key:'yearsOfTrajectory',width:30},
            {header:'Business Category',key:'businessCategory',width:35},
        ]

        //Establecer estilos en el encabezado
        const headerStyles = {
            alignment:{horizontal:'center',vertical:'middle'},
            font:{bold:true,size:18,color:{argb:'FFFFFF'}},
            fill:{type:'pattern',pattern:'solid',fgColor:{argb:'85b933'}},
            border:{bottom:{style:'medium',color:{argb:'cde6a4'}}}
        }

        worksheet.getRow(1).eachCell((cell)=>Object.assign(cell,headerStyles))

        //Añadir filas
        for(const company of data){
            const row = worksheet.addRow({
                name:company.name,
                direction:company.direction,
                companySize:company.companySize,
                webSite:company.webSite,
                impactLevel:company.impactLevel,
                yearsOfTrajectory:company.yearsOfTrajectory,
                businessCategory:company.businessCategory,
            })
        }
        
        //Crear el archivo
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes()
        let seconds = new Date().getSeconds()
        let year = new Date().getFullYear()
        await workbook.xlsx.writeFile(`./src/reports/reportCompanies${year}-${hour}_${minutes}_${seconds}.xlsx`)
    } catch (error) {
        console.log('Error in generateReport',error)
    }
}