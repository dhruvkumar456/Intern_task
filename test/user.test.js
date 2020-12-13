const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/user')

test('Should able to register new account',async()=>{
    const date=Date.now()
    await request(app).post('/register').send({
        name:'Dhruv',
        email:`dunnk${date}@gmail.com`,  
        phoneno:'1234567890',
        address:'adf',
        password:'12345678'
    }).expect(302)   //status code for redirect 

})




test('Should not able register new account',async()=>{
    await request(app).post('/register').send({
        name:'Dhruv',
        email:'dunnk456@gmail.com',  //already in databasde
        phoneno:'1234567890',
        address:'adf',
        password:'12345678'
    }).expect(422)
})

test('Should not able to signin',async()=>{
    await request(app).post('/signin').send({
        email:'',
        password:''
    }).expect(422)

    await request(app).post('/signin').send({
        email:'dunnk456@gmail.com',
        password:''
    }).expect(422)

    await request(app).post('/signin').send({
        email:'',
        password:'12345678'
    }).expect(422)

    await request(app).post('/signin').send({
        email:'dunnk4',
        password:'12345678'
    }).expect(422)
})


test('Should able to signin',async()=>{
    await request(app).post('/signin').send({
        email:'dunnk456@gmail.com',
        password:'12345678'
    }).expect(302)  //redirect status code
})