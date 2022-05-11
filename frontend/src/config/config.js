exports.constants = {
  IP: {
    ipAddress: "54.183.240.252",
    port: "3001",
  },
  API: {
    baseURL: "http://54.183.240.252:3001",
    TAG: {
      addTag : "/api/tags/add",
      getTags: "/api/tags/"
    },
    ADMIN: {
      getUnreviewed : "/api/admin/unreviewed",
      getAnalytics : "/api/admin/analytics",
      approval : "/api/admin/approval",
    },
    ACTIVITY: {
      getActivity: "/api/activity/:activityID"
    },
    COMMENT: {
      postComment: "api/comment"
    }
  },
  PAGES: {
    home: "/"
  },
  constants: {
    questionApproved: "APPROVED",
    questionRejected: "REJECTED",
    questionWaiting: "PENDING",
  },
  baseUrl:'http://54.183.240.252:3001'
};
