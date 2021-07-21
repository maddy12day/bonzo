<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <a
        v-if="$auth.loggedIn"
        class="navbar-brand ml-xl-3 ml-5 hide-desktop"
        href="/"
        >{{ routeName }}</a
      >
    </div>

    <ul
      v-if="$auth.loggedIn"
      class="navbar-nav"
      :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'"
    >
      <span
        >Welcome <b>{{ $auth.user.first_name }} {{ $auth.user.last_name }}</b
        >!&nbsp;&nbsp;</span
      >
      <span @click="logOut()" title="Logout" class="user-logout"
        ><i class="tim-icons icon-button-power"></i
      ></span>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split("/");
      if (parts == ",") {
        return "Dashboard";
      }
      return parts.map((p) => this.capitalizeFirstLetter(p)).join(" ");
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    async logOut() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== "string") {
        return "";
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
.user-logout {
  cursor: pointer;
}
</style>
