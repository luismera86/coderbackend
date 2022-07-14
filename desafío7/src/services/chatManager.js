class ChatManager {

    constructor(dbMariadb, tableName ){
        
            this.dbMariadb=dbMariadb
            this.tableName=tableName
            dbMariadb.schema.hasTable(tableName).then(function(exists) {
                if (!exists) {
                  return dbMariadb.schema.createTable(tableName, table=>{
                    table.increments('id').primary()
                    table.string('userMail',50)
                    table.string('timeChat')
                    table.string('userMessage')
                  });
                }})  
                console.log('se creo la tabla mensaje')
       
        
     
    }
   
    async getAllMessages(){
        let rows= await this.dbMariadb.from(this.tableName).select("*")
        rows.forEach((article)=>{ console.log(`${article['id']} ${article['userMail']} ${article['timeChat']}: ${article['userMessage']}`) })
        return rows
    }

    async newMessages(userMail, timeChat, userMessage ){
        const elemento = {
            userMail,
            timeChat,
            userMessage
        }
        const messages= await this.dbMariadb.from(this.tableName).insert(elemento)
        return messages
    }

}

module.exports = ChatManager