exports.constants = {
  IP: {
    ipAddress: "localhost",
    port: "3001",
  },
  API: {
    baseURL: "http://localhost:3001",
    TAG: {
      addTag : "/api/tags/add",
      getTags: "/api/tags/"
    },
    ADMIN: {
      getUnreviewed : "/api/admin/unreviewed",
      getAnalytics : "/api/admin/analytics",
      approval : "/api/admin/approval",
    }
  },
  PAGES: {
    home: "/"
  },
  constants: {
    questionApproved: "approved",
    questionRejected: "rejected",
    questionWaiting: "waiting for approval",
  }
};
