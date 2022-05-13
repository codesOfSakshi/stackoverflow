let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("../server");
const server = require("../server");

// Assertion style
chai.should();

chai.use(chaiHttp);

describe("StackOverflow API", () => {
  /**
   * Test GET Tags route
   */

  describe("GET /api/tags", () => {
    it("It should get all tags", (done) => {
      chai
        .request(server)
        .get("/api/tags")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(9);
          done();
        });
    });
  });

  /**
   * Test GET  Search Tags by name
   */
  describe("GET /api/tags/search/:name", () => {
    it("Search Tag by name", (done) => {
      chai
        .request(server)
        .get(`/api/tags/search/python`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });
  });

  /**
   * Test GET Single Tag by name
   */
  describe("POST /api/tags/questionbytag", () => {
    it("Get Questions for Tag", (done) => {
      const reqBody = {
        filterType: 1,
        tagId: "DJANGO",
      };
      chai
        .request(server)
        .post(`/api/tags/questionbytag`)
        .send(reqBody)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.questions.should.be.a("array");
          response.body.questions.length.should.be.eq(3);
          done();
        });
    });
  });

  /**
   * Test GET Admin Analytics
   */
  describe("GET /api/admin/analytics", () => {
    it("Get Admin Analytics", (done) => {
      chai
        .request(server)
        .get("/api/admin/analytics")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test GET Admin Unreviewed Questions
   */
  describe("GET /api/admin/unreviewed", () => {
    it("Get Admin unreviewed questions", (done) => {
      chai
        .request(server)
        .get("/api/admin/unreviewed")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test GET Activity
   */
  describe("GET /api/activity", () => {
    it("Get Activity", (done) => {
      chai
        .request(server)
        .get("/api/activity")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test GET All Messages from MySQL
   */
  describe("GET /api/messages/receiveAllMessages/", () => {
    it("Get All messages", (done) => {
      chai
        .request(server)
        .get("/api/messages/receiveAllMessages/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(12);
          done();
        });
    });
  });

  /**
   * Test GET a chat
   */
  describe("GET /api/messages/receiveChat/", () => {
    it("Get A chat", (done) => {
      const reqBody = {
        senderId: "sender1",
        receiverId: "receiver1",
      };
      chai
        .request(server)
        .get("/api/messages/receiveChat/")
        .send(reqBody)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(2);
          done();
        });
    });
  });

  /**
   * Test POST Send a message
   */
  describe("GET /api/messages/sendmessage/", () => {
    it("Send a Message", (done) => {
      const reqBody = {
        senderId: "sender2",
        receiverId: "receiver2",
        senderName: "Sender 2",
        receiverName: "Receiver 2",
        messageString: "Hi testing messaging",
      };
      chai
        .request(server)
        .post("/api/messages/sendmessage/")
        .send(reqBody)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test GET Search User for messaging
   */
  describe("GET /api/user/searchbyname/:name", () => {
    it("Search User by name", (done) => {
      chai
        .request(server)
        .get("/api/user/searchbyname/parmeet")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.be.a("array");
          done();
        });
    });
  });
});
