var request = require('request');

describe('calc', () =>{
    it('should multiply 2 and 2', () =>{
        expect(2*2).toEqual(4)
    })
})

describe('get messages', () =>{
    it('should return 200 ok', (done) =>{
        request.get('http://localhost:3000/messages', (err, res) =>{
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
})

describe('get messages from user', () =>{
    it('should return 200 ok', (done) =>{
        request.get('http://localhost:3000/messages/tim', (err, res) =>{
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('Name should be matt', (done)=>{
        request.get('http://localhost:3000/messages/tim', (err, res) =>{
            var users= JSON.parse(res.body)
            expect(users[0].name).toEqual('tim')
            done()
        })
    } )
})