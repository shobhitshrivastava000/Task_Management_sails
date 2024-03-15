const supertest = require('supertest');

const TestingCallbacks = require('../helpers/TestingCallbacks');

var text;

describe('Testing User Controller ',()=>{

  it('user register',(done) =>{
    supertest(sails.hooks.http.app).post('/user/register').send({
      username:'Test',
      email:'test@gmail.com',
      password:'test123'
    }).end((err, res) => TestingCallbacks.Testfn(err,res,done));
  });

  it(' User login',(done) =>{
    supertest(sails.hooks.http.app).post('/user/login').send({
      email:'test@gmail.com',
      password:'tes123'

    }).end(async(err, res)=>{
      text = await TestingCallbacks.parseText(res.text);
      TestingCallbacks.Testfn(err,res,done);
    });
  });

});

module.exports = {
  getText: () => text
};
