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
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="brandOptions"
        placeholder="Brands"
        SelectedMessValue="Brands"
        :multiple="true"
        @customEvent="
          (event) => (getChannelsByBrand(event), updateGlobalFilterData(event))
        "
        ref="brands"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="channelOptions"
        placeholder="Channel"
        SelectedMessValue="Channels"
        :multiple="true"
        :class="showChannelError ? 'border border-danger rounded' : ''"
        @customEvent="
          (event) => (getBrandByChannel(event), updateGlobalFilterData(event))
        "
        ref="channels"
      />
      <p v-if="showChannelError" class="text-left text-danger small">
        Please select single channel
      </p>
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="subChannelOptions"
        placeholder="Sub Channels"
        SelectedMessValue="Sub Channels"
        :multiple="true"
        @customEvent="
          (event) => (
            getSelectedSubChannel(event), updateGlobalFilterData(event)
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
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="collectionsOptions"
        placeholder="Collections"
        SelectedMessValue="Collections"
        :multiple="true"
        @customEvent="
          (event) => (
            getSelectedCollections(event), updateGlobalFilterData(event)
          )
        "
        ref="collections"
      />
    </div>

    <div :class="showAplyFilterBtn ? 'col-md-7 mt-2' : 'col-md-8 mt-2'">
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
    <div class="col-md-2 mt-1 button-div" v-if="showAplyFilterBtn">
      <button
        class="btn btn-sm btn-primary btn-block applyFilterBtn"
        style="line-height: 28px"
        @click="appliedFilterHandler"
        :disabled="!applyCtaDisabled"
      >
        Apply Filters
      </button>
      <!-- <button
        class="btn btn-sm btn-dark btn-block applyFilterBtn"
        style="line-height: 28px"
        @click="resetFilterHandler"
        :disabled="applyCtaDisabled"
      >
        Reset Filters
      </button> -->
    </div>
  </div>
</template>
<script>
import CustomMultiSelect from "./MultiSelect.vue";
export default {
  name: "RegularFilter",
  props: ["showAplyFilterBtn", "showChannelError"],
  components: {
    CustomMultiSelect,
  },
  data() {
    return {
      skuOptions: [],
      brandOptions: [],
      subChannelOptions: [],
      subChannelValues: [],
      collectionsOptions: [],
      collectionValues: [],
      skuValues: [],
      channelOptions: [],
      BrandValues: [],
      value: null,
      categoryOptions: [],
      newnessOptions: [],
      lifeCycleOptions: [],
      productSourceOptions: [],
      brandTypeOptions: [],
      filterApiData: [],
      //values
      productSourceValues: [],
      brandTypeValues: [],
      newNessValues: [],
      brandValues: [],
      channelValues: [],
      lifeCycleValues: [],
      subChannelValues: [],
      categoryValues: [],
      collectionValues: [],
      skuValues: [],
    };
  },
  computed: {
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
      return this.regularFilterGroupData.filter(
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
        ...this.newNessValues,
        ...this.brandValues,
        ...this.channelValues,
        ...this.lifeCycleValues,
        ...this.subChannelValues,
        ...this.categoryValues,
        ...this.collectionValues,
        ...this.skuValues,
      ];
      this.$store.commit("updateRegularFilter", globalFilterArray);
    },
    appliedFilterHandler() {
      this.$emit("appliedFilters");
      this.$store.commit("toggleCTAState");
      this.$store.commit("toggleStatsAPIResponseState", false);
    },
    getProductSource(value) {
      this.productSourceValues = value.map((item) => item.name);
      this.$emit(
        "getBroductSource",
        value.map((item) => item.name)
      );

      this.$refs.brandType.values = [];
      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      const brandTypes = {
        product_source: this.productSourceValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
      this.brandTypeOptions = [
        ...new Set(dataListGroup.map((item) => item.brand_type)),
      ].map((item) => {
        return {
          name: item,
        };
      });
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
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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

      this.$emit("getBrandType", []);
      this.$emit("getLifyClycle", []);
      this.$emit("newNess", []);
      this.$emit("getChannels", []);
      this.$emit("getBrands", []);
      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);
    },
    getBrandType(value) {
      this.SelectedMessValue = "";
      this.skuOptions = [];
      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      this.$emit("getLifyClycle", []);
      this.$emit("newNess", []);
      this.$emit("getChannels", []);
      this.$emit("getBrands", []);
      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);
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
      const dataListGroup = this.filterDrilldown(cleanObject);
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
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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
      this.$refs.newness.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit("newNess", []);
      this.$emit("getChannels", []);
      this.$emit("getBrands", []);
      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);

      this.$emit(
        "getLifyClycle",
        value.map((item) => item.name)
      );
      this.lifeCycleValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
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
      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      this.$emit("getChannels", []);
      this.$emit("getBrands", []);
      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);
      this.$emit(
        "newNess",
        value.map((item) => item.name)
      );
      this.newNessValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);

      this.brandOptions = [
        ...new Set(dataListGroup.map((item) => item.brand)),
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
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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

    getChannelsByBrand(value) {
      this.$emit(
        "getBrands",
        value.map((item) => item.name)
      );
      this.brandValues = value.map((item) => item.name);

      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
        brand: this.brandValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);

      this.channelOptions = [
        ...new Set(dataListGroup.map((item) => item.channel)),
      ].map((item) => {
        return {
          name: item,
        };
      });
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      this.$emit("getChannels", []);
      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);
    },
    getBrandByChannel(value) {
      this.$emit(
        "getChannels",
        value.map((item) => item.name)
      );
      this.channelValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
        brand: this.brandValues,
        channel: this.channelValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
      this.subChannelOptions = [
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

      this.collectionsOptions = [
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

      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      this.$emit("getSubChannelValues", []);
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);
    },
    getSelectedSubChannel(value) {
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subChannelValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
        brand: this.brandValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
      this.categoryOptions = [
        ...new Set(dataListGroup.map((item) => item.category)),
      ].map((item) => {
        return {
          name: item,
        };
      });

      this.collectionsOptions = [
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
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit("getCategories", []);

      this.$emit(
        "getSubChannelValues",
        value.map((item) => item.name)
      );
    },
    getSelectedCategories(value) {
      this.$emit("getCollectionValus", []);
      this.$emit("getSkusValues", []);
      this.$emit(
        "getCategories",
        value.map((item) => item.name)
      );

      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.categoryValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
        brand: this.brandValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoryValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
      this.collectionsOptions = [
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
    getSelectedCollections(value) {
      this.$refs.skus.values = [];
      this.collectionValues = value.map((item) => item.name);
      const brandTypes = {
        brand_type: this.brandTypeValues,
        product_source: this.productSourceValues,
        life_cycle: this.lifeCycleValues,
        newness: this.newNessValues,
        brand: this.brandValues,
        channel: this.channelValues,
        sub_channel: this.subChannelValues,
        category: this.categoryValues,
        collection: this.collectionValues,
      };
      const cleanObject = this.emptyFieldCleaner(brandTypes);
      const dataListGroup = this.filterDrilldown(cleanObject);
      this.skuOptions = [...new Set(dataListGroup.map((item) => item.sku))].map(
        (item) => {
          return {
            name: item,
          };
        }
      );
      this.$emit("getSkusValues", []);

      this.$emit(
        "getCollectionValus",
        value.map((item) => item.name)
      );
    },
    getSelectedSkus(skus) {
      this.skuValues = skus.map((sku) => sku.name.split(":")[0]);
      this.$emit("getSkusValues", this.skuValues);
    },
  },
  async mounted() {
    const filterResponse = await this.$axios.$get("/regular-filter-data");
    this.regularFilterGroupData = filterResponse.response;
    const optionGenerator = (data) => {
      return [
        ...[...new Set(data)].sort().map((item) => {
          return { name: item };
        }),
      ];
    };
    this.productSourceOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.product_source)
    );
    this.lifeCycleOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.life_cycle)
    );
    this.brandTypeOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.brand_type)
    );
    this.newnessOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.newness)
    );
    this.channelOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.channel)
    );
    this.subChannelOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.sub_channel)
    );
    this.categoryOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.category)
    );
    this.collectionsOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.collection)
    );
    this.skuOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.sku)
    );
    this.brandOptions = optionGenerator(
      this.regularFilterGroupData.map((item) => item.brand)
    );
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.applyFilterBtn {
  height: 43px;
  margin-top: 4px;
}

.button-div {
  display: flex;
}
</style>
