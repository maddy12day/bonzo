<template>
  <div class="row">
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="productSourceOptions"
        placeholder="Product Source"
        SelectedMessValue="Product Source"
        :multiple="true"
        @customEvent="
          (event) => (getProductSource(event), updateGlobalFilterData(event))
        "
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="brandTypeOptions"
        placeholder="Brand Type"
        SelectedMessValue="Brand Type"
        :multiple="true"
        @customEvent="
          (event) => (getBrandType(event), updateGlobalFilterData(event))
        "
        ref="brandType"
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="lifeCycleOptions"
        placeholder="Life Cycle"
        SelectedMessValue="Life Cycle"
        :multiple="true"
        @customEvent="
          (event) => (getLifeCycle(event), updateGlobalFilterData(event))
        "
        ref="lifeCycle"
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="newnessOptions"
        placeholder="Newness"
        SelectedMessValue="Newness"
        :multiple="true"
        @customEvent="
          (event) => (getNewness(event), updateGlobalFilterData(event))
        "
        ref="newness"
      />
    </div>
    <div class="col-md-2 mt-2">
      <CustomMultiSelect
        :Options="brandOptions"
        placeholder="Brands"
        SelectedMessValue="Brands"
        :multiple="true"
        @customEvent="
          (event) => (getSelectedBrands(event), updateGlobalFilterData(event))
        "
        ref="brands"
      />
    </div>
    <div class="col-md-2 mt-2">
      <CustomMultiSelect
        :Options="programs"
        placeholder="Programs"
        SelectedMessValue="Programs"
        :multiple="true"
        @customEvent="
          (event) => (getSelectedPrograms(event), updateGlobalFilterData(event))
        "
        ref="programs"
      />
    </div>
    <div class="col-md-2 mt-2">
      <CustomMultiSelect
        :Options="channelOptions"
        placeholder="Channels"
        SelectedMessValue="Channels"
        :multiple="true"
        @customEvent="
          (event) => (
            getSelectProgramChannels(event), updateGlobalFilterData(event)
          )
        "
        :class="showChannelError ? 'border border-danger rounded' : ''"
        ref="channels"
      />
      <p v-if="showChannelError" class="text-left text-danger small">
        Please select single channel
      </p>
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="programSubChannels"
        placeholder="Sub Channels"
        SelectedMessValue="Sub Channels"
        :multiple="true"
        @customEvent="
          (event) => (
            getSelectPrograChannelsSubChannels(event),
            updateGlobalFilterData(event)
          )
        "
        ref="subChannels"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="categoryOptions"
        placeholder="Categories"
        SelectedMessValue="Categories"
        :multiple="true"
        @customEvent="
          (event) => (
            getSelectedCategories(event), updateGlobalFilterData(event)
          )
        "
        ref="categories"
      />
    </div>
    <div class="col-md-2 mt-2">
      <CustomMultiSelect
        :Options="classesOptions"
        placeholder="Classes"
        SelectedMessValue="Classes"
        :multiple="true"
        @customEvent="
          (event) => (getCategoryClasses(event), updateGlobalFilterData(event))
        "
        ref="classes"
      />
    </div>
    <div class="col-md-2 mt-2">
      <CustomMultiSelect
        :Options="subClassesOptions"
        placeholder="Sub Classes"
        SelectedMessValue="Sub Classes"
        :multiple="true"
        @customEvent="
          (event) => (classesSubClasses(event), updateGlobalFilterData(event))
        "
        ref="subClasses"
      />
    </div>

    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="programCollectionsOptions"
        placeholder="Collections"
        SelectedMessValue="Collections"
        :multiple="true"
        @customEvent="
          (event) => (
            subClaasesCollections(event), updateGlobalFilterData(event)
          )
        "
        ref="collections"
      />
    </div>
    <div :class="showAplyFilterBtn ? 'col-md-3 mt-2' : 'col-md-5 mt-2'">
      <CustomMultiSelect
        :Options="skuOptions"
        placeholder="SKUs"
        SelectedMessValue="SKUs"
        :multiple="true"
        @customEvent="
          (event) => (getSelectedSkus(event), updateGlobalFilterData(event))
        "
        ref="skus"
      />
    </div>
    <div class="col-md-2 mt-1" v-if="showAplyFilterBtn">
      <button
        class="btn btn-sm btn-primary btn-block applyFilterBtn"
        style="line-height: 28px"
        @click="getAppliedFilters"
        :disabled="!applyCtaDisabled"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>
<script>
import CustomMultiSelect from "./MultiSelect.vue";
export default {
  name: "ProgramFilters",
  props: ["showAplyFilterBtn", "showChannelError"],
  components: {
    CustomMultiSelect,
  },
  data() {
    return {
      skuOptions: [],
      programs: [],
      categoryOptions: [],
      brandOptions: [],
      classesOptions: [],
      channelOptions: [],
      programSubChannels: [],
      programCollectionsOptions: [],
      collectionValues: [],
      classesValues: [],
      subclassesValues: [],
      subClassesOptions: [],
      skuValues: [],
      CategoriesValues: [],
      value: null,
      newnessOptions: [],
      lifeCycleOptions: [],
      productSourceOptions: [],
      brandTypeOptions: [],
      filterApiData: [],

      // values
      productSourceValues: [],
      brandTypeValues: [],
      lifeCycleValues: [],
      newnessValues: [],
      brandValues: [],
      programValues: [],
      channelValues: [],
      subChannelValues: [],
      categoriesValues: [],
      classesValues: [],
      subClassValues: [],
      collectionValues: [],
      skuValues: [],
      programFilterGroupData: [],
      // =====
      productSourceGroup: [],
      brandTypeGroup: [],
      lifeCyclesGroup: [],
      newnessGroup: [],
      brandGroup: [],
      channelGroup: [],
      subChannelGroup: [],
      categoryGroup: [],
      collectionGroup: [],
      skuGroup: [],
    };
  },
  computed: {
  
    showChannelErrorCom() {
      return this.showChannelError;
    },
    applyCtaDisabled() {
      return this.$store.state.appliedRegularFilter.length > 0 &&
        !this.$store.state.isDataLoading
        ? true
        : false;
    },
  },
  methods: {
      emptyFieldCleaner(reqBody) {
        for (let key in reqBody) {
      if (reqBody[key] == "" || reqBody[key] == undefined) {
        delete reqBody[key];
      }
      if (Array.isArray(reqBody[key]) && reqBody[key].length > 1) {
        reqBody[key] = reqBody[key].map((item) => {
          if (item.includes("All") === false) {
            return item;
          }
        });
      } else if (Array.isArray(reqBody[key]) && reqBody[key].length == 1) {
        reqBody[key] = reqBody[key].map((item) => {
          if (item.includes("All") === false) {
            return item;
          }
        });
      }
    }
    return reqBody;
    },
    filterDrilldown(obj) {
      return this.programFilterGroupData.filter(
        (item) =>
          !Object.keys(obj)
            .map((inner) => {
              if (obj[inner].includes(item[inner])) {
                return true;
              } else {
                false;
              }
            })
            .includes(undefined)
      );
    },
    updateGlobalFilterData() {
      let globalFilterArray = [];
      globalFilterArray = [
        ...this.productSourceValues,
        ...this.brandTypeValues,
        ...this.newnessValues,
        ...this.brandValues,
        ...this.channelValues,
        ...this.lifeCycleValues,
        ...this.subChannelValues,
        ...this.categoriesValues,
        ...this.collectionValues,
        ...this.skuValues,
        ...this.programValues,
        ...this.subClassValues,
        ...this.classesValues,
      ];
      this.$store.commit("updateRegularFilter", globalFilterArray);
    },
    getProductSource(value) {
      this.$emit("getBrandType", []);
      this.$emit("getLifyClycle", []);
      this.$emit("newNess", []);
      this.$emit("getBrands", []);
      this.$emit("getPrograms", []);
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.brandType.values = [];
      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.programs.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "getBroductSource",
        value.map((item) => item.name)
      );
      let productSources;
      this.productSourceValues = value.map((item) => item.name);

      this.productSourceGroup = this.programFilterGroupData.filter((item) =>
        this.productSourceValues.includes(item.product_source)
      );
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = value;

        this.brandTypeOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.brand_type)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });

        this.lifeCycleOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.life_cycle)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.newnessOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.newness)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.programs = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.brand)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });

        this.brandOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.brand)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.programs = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.collab)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.channelOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.channel)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.programSubChannels = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.sub_channel)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.categoryOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.category)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.classesOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.class)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.subClassesOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.sub_class)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.programCollectionsOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.collection)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
        this.skuOptions = [
          ...new Set(
            this.programFilterGroupData
              .filter((item) =>
                this.productSourceValues.includes(item.product_source)
              )
              .map((item) => item.sku)
          ),
        ].map((item) => {
          return {
            name: item,
          };
        });
      }
    },
    getBrandType(value) {
  

      this.$emit("getLifyClycle", []);
      this.$emit("newNess", []);
      this.$emit("getBrands", []);
      this.$emit("getPrograms", []);
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.programs.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "getBrandType",
        value.map((item) => item.name)
      );
      this.brandTypeValues = value.map((item) => item.name);

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.lifeCycleOptions = [
        ...new Set(dataListGroup.map((item) => item.life_cycle)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.newnessOptions = [
        ...new Set(dataListGroup.map((item) => item.newness)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programs = [...new Set(dataListGroup.map((item) => item.brand))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );

      this.brandOptions = [
        ...new Set(dataListGroup.map((item) => item.brand)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programs = [
        ...new Set(dataListGroup.map((item) => item.collab)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getLifeCycle(value) {
      this.$emit(
        "getLifyClycle",
        value.map((item) => item.name)
      );

      this.$emit("newNess", []);
      this.$emit("getBrands", []);
      this.$emit("getPrograms", []);
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.lifeCycleValues = value.map((item) => item.name);

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.newnessOptions = [
        ...new Set(dataListGroup.map((item) => item.newness)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programs = [...new Set(dataListGroup.map((item) => item.brand))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );

      this.brandOptions = [
        ...new Set(dataListGroup.map((item) => item.brand)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programs = [
        ...new Set(dataListGroup.map((item) => item.collab)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getNewness(value) {
      this.$emit("getBrands", []);
      this.$emit("getPrograms", []);
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.programs.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "newNess",
        value.map((item) => item.name)
      );
      this.newnessValues = value.map((item) => item.name);

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.programs = [...new Set(dataListGroup.map((item) => item.brand))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );

      this.brandOptions = [
        ...new Set(dataListGroup.map((item) => item.brand)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programs = [
        ...new Set(dataListGroup.map((item) => item.collab)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getAppliedFilters(value) {
      this.$emit("appliedFilters");
      this.$store.commit("toggleProgramFilterCTAState");
      this.$store.commit("toggleStatsAPIResponseState", false);
    },
    getSelectedBrands(value) {
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

      this.$emit("getPrograms", []);
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.programs.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.brandValues = value.map((item) => item.name);
      this.$emit(
        "getBrands",
        value.map((item) => item.name)
      );

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.programs = [
        ...new Set(dataListGroup.map((item) => item.collab)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getSelectedPrograms(value) {
      this.$emit("getChannels", []);
      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.programValues = value.map((item) => item.name);
      this.$emit(
        "getPrograms",
        value.map((item) => item.name)
      );

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
      };
      console.log(brandTypes)
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      console.log(dataListGroup)
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getSelectProgramChannels(value) {
      
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

      this.$emit("getSubChannel", []);
      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.subChannels.values = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.channelValues = value.map((item) => item.name);
      this.$emit(
        "getChannels",
        value.map((item) => item.name)
      );
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.programSubChannels = [
        ...new Set(dataListGroup.map((item) => item.sub_channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getSelectPrograChannelsSubChannels(value) {

      this.$emit("getCategories", []);
      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subChannelValues = value.map((item) => item.name);
      this.$emit(
        "getSubChannel",
        value.map((item) => item.name)
      );

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getSelectedCategories(value) {

      this.$emit("getClass", []);
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.programs.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.classes.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.categoriesValues = value.map((item) => item.name);
      this.$emit(
        "getCategories",
        value.map((item) => item.name)
      );

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoriesValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.classesOptions = [
        ...new Set(dataListGroup.map((item) => item.class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getCategoryClasses(value) {
      this.$emit("getSubClass", []);
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.subClasses.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.classesValues = value.map((item) => item.name);
      this.$emit(
        "getClass",
        value.map((item) => item.name)
      );

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoriesValues,
        class: this.classesValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.subClassesOptions = [
        ...new Set(dataListGroup.map((item) => item.sub_class)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    classesSubClasses(value) {
      this.$emit("getCollection", []);
      this.$emit("getSkusValues", []);

      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subClassValues = value.map((item) => item.name);
      this.$emit(
        "getSubClass",
        value.map((item) => item.name)
      );
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoriesValues,
        class: this.classesValues,
        sub_class: this.subClassValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.programCollectionsOptions = [
        ...new Set(dataListGroup.map((item) => item.collection)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    subClaasesCollections(value) {
      this.$emit("getSkusValues", []);
      this.$refs.skus.values = [];
      this.collectionValues = value.map((item) => item.name);

      this.$emit(
        "getCollection",
        value.map((item) => item.name)
      );
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newnessValues,
        brand: this.brandValues,
        collab: this.programValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoriesValues,
        class: this.classesValues,
        sub_class: this.subClassValues,
        collection: this.collectionValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(
        cleanObject
      );
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
    },
    getSelectedSkus(skus) {
      this.skuValues = skus.map((sku) => sku.name.split(":")[0]);
      this.$emit("getSkusValues", this.skuValues);
    },
  },
  async mounted() {
    const filterResponse = await this.$axios.$get("/program-filter-data");
    if(filterResponse.response) {
    this.programFilterGroupData = filterResponse.response;
    const optionGenerator = (data, keyName) => {
      return [
        ...[...new Set(data)].sort().map((item) => {
          return { name: item };
        }),
      ];
    };
    this.productSourceOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.product_source)
    );
    this.lifeCycleOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.life_cycle)
    );
    this.brandTypeOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.brand_type)
    );
    this.newnessOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.newness)
    );
    this.programs = optionGenerator(
      this.programFilterGroupData.map((item) => item.collab)
    );
    this.channelOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.channel)
    );
    this.programSubChannels = optionGenerator(
      this.programFilterGroupData.map((item) => item.sub_channel)
    );
    this.categoryOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.category)
    );
    this.classesOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.class)
    );
    this.subClassesOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.sub_class)
    );
    this.programCollectionsOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.collection)
    );
    this.skuOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.sku)
    );
    this.brandOptions = optionGenerator(
      this.programFilterGroupData.map((item) => item.brand)
    );
    }
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.applyFilterBtn {
  height: 43px;
}
</style>
