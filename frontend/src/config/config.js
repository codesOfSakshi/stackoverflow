exports.constants = {
  IP: {
    ipAddress: "52.53.222.153",
    port: "3001",
  },
  API: {
    baseURL: "http://52.53.222.153:3001",
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
  baseUrl:'http://52.53.222.153:3001'
};
