const should=require('should')
const assert=require('assert')
const request=require('supertest')
const app=require('./index')

describe('GET /users',()=>{
    describe('Success',()=>{
        it('Return Array',(done)=>{
            request(app)
            .get('/users')
            .end((err,res)=>{
              res.body.should.be.instanceof(Array)
              res.body.forEach(user=>{
                  user.should.have.property('name')
              })
              done()
            })
        })
        it('max:limit number',done=>{
                request(app)
                .get('/users?limit=2')
                .end((err,res)=>{
                    res.body.should.have.lengthOf(2)
                    done()
                })
        })
    })
    describe('Not success',()=>{
      it('limit not number=>400',done=>{
          request(app)
          .get('/users?limit=two')
          .expect(400)
          .end(done)
      })
    })

})

describe('GET /users/:id',()=>{
    describe('Success',()=>{
      it('Return User object',done=>{
          request(app)
          .get('/users/1')
          .end((err,res)=>{
              res.body.should.have.property('id',1)
              done()
          })
      })
    })
    describe('Fail',()=>{
        it('not number=>400',(done)=>{
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
        })
        it('can not find=>404',(done)=>{
            request(app)
            .get('/users/9')
            .expect(404)
            .end(done)
        })
    })
})

describe('DELETE /users/:id',()=>{
    describe('Success',()=>{
        it('Return 204',done=>{
            request(app)
            .delete('/users/3')
            .expect(204)
            .end(done)
        })
    })
    describe('Fail',()=>{
        it('id is not number=>400',done=>{
            request(app)
            .delete('/users/three')
            .expect(400)
            .end(done)
        })
    })
})

describe('POST /users',()=>{
    describe('Success',()=>{
        it('Return 201,Return created object',done=>{
            request(app)
            .post('/users').send({name:'Daniel'})
            .expect(201)
            .end((err,res)=>{
                res.body.should.have.property('name','Daniel')
                done()
            })
        })
    })
    describe('Fail',()=>{
        it('not name=>400',done=>{
            request(app)
            .post('/users').send({})
            .expect(400).end(done)
        })
        it('name repeated=>409',done=>{
            request(app)
            .post('/users').send({name:'Alice'})
            .expect(409).end(done)
        })
    })
})