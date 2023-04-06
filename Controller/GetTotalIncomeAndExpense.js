exports.getTotalIncomeAndExpense =  (data , value)=>{
   

    if(value === "TotalIncome"){

       
        

        if(!data.length == 0){
            //gelen obje ilk olarak array'e dönüştürüldü sonra toplandı.
            amount  = Object.keys(data).map(key => parseInt(data[key].amount)).reduce( (accumulator,value) => accumulator + value);
        
            return amount
        }

        return 0

        
    }

    
    


    if(!data.length == 0){
        //gelen obje ilk olarak array'e dönüştürüldü sonra toplandı.
        expense  = Object.keys(data).map(key => parseInt(data[key].total)).reduce( (accumulator,value) => accumulator + value);
        
        return expense 
    }
   
    return 0
    

}
