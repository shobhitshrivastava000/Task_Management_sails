const supertest = require('supertest');
const TestingCallbacks = require('../helpers/TestingCallbacks');

const { getText } = require('./UserController.test.js');


describe('Testing Task Controller', () => {

  it('Creating task', (done) => {
    const text = getText();
    // console.log(text);
    supertest(sails.hooks.http.app)
      .post('/add')
      .set({ Authorization: text.accessToken })
      .send({
        data: 'Task is created',
        userid: '65f2ece6bcc1c400c97eef4e',
      })
      .end((err, res) => {
        TestingCallbacks.Testfn(err, res, done);
        // console.log("first",res.text)
      });
  });

  it('getting  task', (done) => {
    const text = getText();
    console.log(text)
    supertest(sails.hooks.http.app)
      .get(`/gettasks/${text.user.id}`)
      .set({ Authorization: text.accessToken })
      .end((err, res) => {
        TestingCallbacks.Testfn(err, res, done);

      });
  });

  it('updating task', (done) => {
    const text = getText();
    const taskID = '65f411e04a331de7b8a08e4c';
    supertest(sails.hooks.http.app)
      .put(`/update/${taskID}`)
      .set({ Authorization: text.accessToken })
      .send({
        data: 'Test is  updated',
      })
      .end((err, res) => {
        TestingCallbacks.Testfn(err, res, done);
      });
  });

  it('deleting task', (done) => {
    const text = getText();
    const taskID = '65f412c614e7e0f6c8ed7720';
    supertest(sails.hooks.http.app)
      .delete(`/delete/${taskID}`)
      .set({ Authorization: text.accessToken })
      .end((err, res) => {
        TestingCallbacks.Testfn(err, res, done);
      });
  });

  it('toggletask',(done) =>{
    const text = getText();
    const toggleTaskId = '65f411e04a331de7b8a08e4c';
    supertest(sails.hooks.http.app)
    .put(`/gettoggle/${toggleTaskId}`)
    .set({ Authorization: text.accessToken })
    .send({done: !toggleTaskId.done})
    .end((err, res) => {
      TestingCallbacks.Testfn(err, res, done);
    });
  })

});
