exports.constants = {
  IP: {
    ipAddress: "stackoverflow-lb-1188096937.us-west-1.elb.amazonaws.com",
    port: "3001",
  },
  API: {
    baseURL: "http://stackoverflow-lb-1188096937.us-west-1.elb.amazonaws.com:3001",
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
  baseUrl:'http://stackoverflow-lb-1188096937.us-west-1.elb.amazonaws.com:3001'
};
