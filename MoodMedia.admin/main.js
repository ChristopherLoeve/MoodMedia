const app = Vue.createApp({
  data() {
    return {
      adminSettings: false,
      authenticated: true,
      userId: "steven.basker",
    };
  },
  methods: {
    logout() {
      return (this.authenticated = false);
    },
    login() {
      this.authenticated = !this.authenticated;
    },
    showUserActivity() {
      $(document).ready(function () {
        $("#userActivityModal").modal("show");
    },

    getAdminSettings() {
      this.adminSettings = true;
      this.toggleAdminSettingsModal();
    },
    toggleAdminSettingsModal() {
      $(document).ready(function () {
        $("#adminSettingsModel").modal("show");
      });
    },
  },
});
