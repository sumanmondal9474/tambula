function tambula(){
    const ticket=[[],[],[]]
    const [row1,row2,row3]=ticket
    
    const random = (min,max,notArr=[])=>{
        const res= Math.round(Math.random()* (max-min))+min
        if(!notArr.includes(res))return res
        return random(min,max,notArr)
    }
    const tikitColumns=[[1,9],[10,19],[20,29],[30,39],[40,49],[50,59],[60,69],[70,79],[80,90]]
    for(let i =0; i<9;i++){
        const column = []
        let j =0
        while(j<3){
            const min = tikitColumns[i][0]
            const max = tikitColumns[i][1]
            const _num = random(min,max,column)
            column.push(_num)
            j++
        }
        column.sort((a,b)=>a-b)
        row1[i]=column[0]
        row2[i]=column[1]
        row3[i]=column[2]
        
    }
    //update rows
    for(let i of ticket){
        const column = []
        let j =0
        while(j<4){
            const _pos = random(0,8,column)
            i[_pos]=0
            column.push(_pos)
            j++
        }
    }
    return ticket
}

module.exports={
    tambula
}