const describe = require("mocha").describe
const it = require("mocha").it
const chai = require("chai")
const request = require("request")

describe("Types Test", () => {
    it("Should try to create a type and receive status code 201", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            chai.expect(res.statusCode).to.be.eql(201)
        })
    })

    it("Should try to create a type with a missing parameter and receive status code 400", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a"
            }
        }, (_, res) => {
            chai.expect(res.statusCode).to.be.eql(400)
        })
    })

    it("Should try to update an existent type and receive status code 200", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.put("http://localhost:3050/types/update", {
                json: {
                    "_id": res.body._id,
                    "name": "Cool"
                }
            }, (_, updated) => {
                chai.expect(updated.statusCode).to.be.eql(200)
                chai.expect(updated.body.name).to.be.eql("Cool")
            })
        })
    })

    it("Should try to update an existent type without providing an _id and receive status code 400",
    () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.put("http://localhost:3050/types/update", {
                json: {
                    "name": "Cool"
                }
            }, (_, updated) => {
                chai.expect(updated.statusCode).to.be.eql(400)
            })
        })
    })

    it("Should try to remove an existent type and receive status code 200", done => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.delete("http://localhost:3050/types/delete", {
                json: {
                    "_id": res.body._id
                }
            }, (_, updated) => {
                chai.expect(updated.statusCode).to.be.eql(200)
                done()
            })
        })
    })

    it("Should query types and check if the array size is greater than 1", () => {
        request.get("http://localhost:3050/types/get", (_, res) => {
            chai.expect(JSON.parse(res.body).length).to.be.greaterThan(1)
        })
    })
})

describe("Jokes Test", () => {
    it("Should try to create a joke and receive status code 201", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.post("http://localhost:3050/jokes/create", {
                json: {
                    "_id": "n/a",
                    "_type": res.body._id,
                    "text": "A very funny joke"
                }
            }, (_, created) => {
                chai.expect(created.statusCode).to.be.eql(201)
            })
        })
    })

    it("Should try to create a joke with a missing parameter and receive status code 400", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.post("http://localhost:3050/jokes/create", {
                json: {
                    "_id": "n/a",
                    "text": "A very funny joke"
                }
            }, (_, created) => {
                chai.expect(created.statusCode).to.be.eql(400)
            })
        })
    })

    it("Should try to update an existent joke and receive status code 200", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.post("http://localhost:3050/jokes/create", {
                json: {
                    "_id": "n/a",
                    "_type": res.body._id,
                    "text": "A very funny joke"
                }
            }, (_, created) => {
                request.put("http://localhost:3050/jokes/update", {
                    json: {
                        "_id": created.body._id,
                        "_type": created.body._type,
                        "text": "Another very funny joke"
                    }
                }, (_, updated) => {
                    chai.expect(updated.statusCode).to.be.eql(200)
                    chai.expect(updated.body.text).to.be.eql("Another very funny joke")
                })
            })
        })
    })

    it("Should try to update an existent joke without providing an _id and receive status code 400", 
    () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.post("http://localhost:3050/jokes/create", {
                json: {
                    "_id": "n/a",
                    "_type": res.body._id,
                    "text": "A very funny joke"
                }
            }, (_, created) => {
                request.put("http://localhost:3050/jokes/update", {
                    json: {
                        "_type": created.body._type,
                        "text": "Another very funny joke"
                    }
                }, (_, updated) => {
                    chai.expect(updated.statusCode).to.be.eql(400)
                })
            })
        })
    })

    it("Should try to remove an existent joke and receive status code 200", () => {
        request.post("http://localhost:3050/types/create", {
            json: {
                "_id": "n/a",
                "name": "Amazing"
            }
        }, (_, res) => {
            request.post("http://localhost:3050/jokes/create", {
                json: {
                    "_id": "n/a",
                    "_type": res.body._id,
                    "text": "A very funny joke"
                }
            }, (_, created) => {
                request.delete("http://localhost:3050/jokes/delete", {
                    json: {
                        "_id": created.body._id,
                    }
                }, (_, updated) => {
                    chai.expect(updated.statusCode).to.be.eql(200)
                })
            })
        })
    })

    it("Should query a random joke and receive a joke", () => {
        request.get("http://localhost:3050/jokes/random", (_, res) => {
            chai.expect(res.statusCode).to.be.eql(200)
            chai.expect(JSON.parse(res.body)._id).to.exist.and.to.not.be.empty
        })
    })

    it("Should query a joke by its id and receive a joke", () => {
        request.get("http://localhost:3050/jokes/random", (_, res) => {
            request.get(`http://localhost:3050/jokes/get/${JSON.parse(res.body)._id}`, (_, found) => {
                chai.expect(found.statusCode).to.be.eql(200)
                chai.expect(JSON.parse(found.body)._id).to.exist.and.to.not.be.empty
            })
        })
    })

    it("Should query many jokes providing page and size and receive an array", () => {
        request.get("http://localhost:3050/jokes/get/page/0/size/10", (_, res) => {
            chai.expect(res.statusCode).to.be.eql(200)
        })
    })

    it("Should query many jokes by its type and receive an array", () => {
        request.get("http://localhost:3050/jokes/random", (_, res) => {
            request.get(`http://localhost:3050/jokes/get/type/${res.body._type}/page/0/size/10`,
            (_, found) => {
                chai.expect(res.statusCode).to.be.eql(200)
            })
        })
        
    })
})