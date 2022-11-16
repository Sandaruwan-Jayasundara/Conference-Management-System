const Submission=require('../api/submission.api');
const supertest=require('supertest')
const datatime = new Date();

const request = supertest(Submission);

describe("all details are correct",()=>{


  test("response must be 201",async()=>{
    const response=await request.post("/test").send({
        name:"sdsds",
        age:20
    })
    expect(response.statusCode).toBe(201)
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toHaveProperty('users')
})




})
  
  