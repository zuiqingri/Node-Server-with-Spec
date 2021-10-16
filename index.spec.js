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