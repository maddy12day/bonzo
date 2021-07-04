<template>
  <div class="row">
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="productSourceOptions"
        placeholder="Product Source"
        SelectedMessValue="Product Source"
        :multiple="true"
        @customEvent="getProductSource"
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="brandTypeOptions"
        placeholder="Brand Type"
        SelectedMessValue="Brand Type"
        :multiple="true"
        @customEvent="getBrandType"
        ref="brandType"
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="lifeCycleOptions"
        placeholder="Life Cycle"
        SelectedMessValue="Life Cycle"
        :multiple="true"
        @customEvent="getLifeCycle"
        ref="lifeCycle"
      />
    </div>
    <div class="col-md-3">
      <CustomMultiSelect
        :Options="newnessOptions"
        placeholder="Newness"
        SelectedMessValue="Newness"
        :multiple="true"
        @customEvent="getNewness"
        ref="newness"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="brandOptions"
        placeholder="Brands"
        SelectedMessValue="Brands"
        :multiple="true"
        @customEvent="getChannelsByBrand"
        ref="brands"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="channelOptions"
        placeholder="Channel"
        SelectedMessValue="Channels"
        :multiple="true"
        @customEvent="getBrandByChannel"
        ref="channels"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="subChannelOptions"
        placeholder="Sub Channels"
        SelectedMessValue="Sub Channels"
        :multiple="true"
        @customEvent="getSelectedSubChannel"
        ref="subChannels"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="categoryOptions"
        placeholder="Categories"
        SelectedMessValue="Categories"
        :multiple="true"
        @customEvent="getSelectedCategories"
        ref="categories"
      />
    </div>
    <div class="col-md-3 mt-2">
      <CustomMultiSelect
        :Options="collectionsOptions"
        placeholder="Collections"
        SelectedMessValue="Collections"
        :multiple="true"
        @customEvent="getSelectedCollections"
        ref="collections"
      />
    </div>

    <div :class="showAplyFilterBtn ? 'col-md-6 mt-2' : 'col-md-8 mt-2'">
      <CustomMultiSelect
        :Options="skuOptions"
        placeholder="SKUs"
        SelectedMessValue="SKUs"
        :multiple="true"
        @customEvent="getSelectedSkus"
        ref="skus"
      />
    </div>
    <div class="col-md-3 mt-1 button-div" v-if="showAplyFilterBtn">
      <button
        class="btn btn-sm btn-primary btn-block applyFilterBtn"
        style="line-height: 28px"
        @click="appliedFilterHandler"
        :disabled="applyCtaDisabled"
      >
        Apply Filter
      </button>
      <button
        class="btn btn-sm btn-dark btn-block applyFilterBtn"
        style="line-height: 28px"
        @click="resetFilterHandler"
        :disabled="applyCtaDisabled"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>
<script>
import CustomMultiSelect from "./MultiSelect.vue";
export default {
  name: "RegularFilter",
  props: ["showAplyFilterBtn"],
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
      return this.$store.state.regularFilterCTADisabled;
    },
  },
  methods: {
    appliedFilterHandler() {
      this.$emit("appliedFilters");
      this.$store.commit("toggleCTAState");
    },
    resetFilterHandler() {
      this.$emit("resetFilter");
    },
    getProductSource(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };

      this.productSourceValues = value.map((item) => item.name);
      this.$emit(
        "getBroductSource",
        value.map((item) => item.name)
      );
      let brandType = [];
      let lifeCycle = [];
      let newNess = [];
      let brands = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];
      this.$refs.brandType.values = [];
      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      let productSources;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        brandType.push(
          ...this.filterApiData.productSource.brand_type[`${psource}`]
        );
        lifeCycle.push(
          ...this.filterApiData.productSource.life_cycle[`${psource}`]
        );
        newNess.push(...this.filterApiData.productSource.newness[`${psource}`]);
        brands.push(...this.filterApiData.productSource.brand[`${psource}`]);
        channels.push(
          ...this.filterApiData.productSource.channel[`${psource}`]
        );
        subChannels.push(
          ...this.filterApiData.productSource.sub_channel[`${psource}`]
        );
        categories.push(
          ...this.filterApiData.productSource.category[`${psource}`]
        );
        collections.push(
          ...this.filterApiData.productSource.collection[`${psource}`]
        );
        skus.push(...this.filterApiData.productSource.sku[`${psource}`]);
      }
      this.brandTypeOptions = optionGenerator(brandType, "All Brand Types");
      this.lifeCycleOptions = optionGenerator(lifeCycle, "All Life Cycles");
      this.newnessOptions = optionGenerator(newNess, "All Newness");
      this.brandOptions = optionGenerator(brands, "All Brands");
      this.channelOptions = optionGenerator(channels, "All Channels");
      this.subChannelOptions = optionGenerator(subChannels, "All Sub Channels");
      this.categoryOptions = optionGenerator(categories, "All Categories");
      this.collectionsOptions = optionGenerator(collections, "All Collections");
      this.skuOptions = optionGenerator(skus, "All SKUs");
    },
    getBrandType(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };

      this.SelectedMessValue = "";
      this.skuOptions = [];
      let lifeCycle = [];
      let newNess = [];
      let brands = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];
      this.$refs.newness.values = [];
      this.$refs.lifeCycle.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "getBrandType",
        value.map((item) => item.name)
      );
      this.brandTypeValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          lifeCycle.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.life_cycle[
                  `('${psource}', '${brandType}')`
                ],
                "All Life Cycles"
              )
            )
          );
          newNess.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.newness[
                  `('${psource}', '${brandType}')`
                ],
                "All Newness"
              )
            )
          );
          brands.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.brand[
                  `('${psource}', '${brandType}')`
                ],
                "All Brands"
              )
            )
          );
          channels.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.channel[
                  `('${psource}', '${brandType}')`
                ],
                "All Channels"
              )
            )
          );
          subChannels.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.sub_channel[
                  `('${psource}', '${brandType}')`
                ],
                "All Sub Channel"
              )
            )
          );
          categories.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.category[
                  `('${psource}', '${brandType}')`
                ],
                "All Categories"
              )
            )
          );
          collections.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.collection[
                  `('${psource}', '${brandType}')`
                ],
                "All Collections"
              )
            )
          );
          skus.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.brandType.sku[
                  `('${psource}', '${brandType}')`
                ],
                "All Sku"
              )
            )
          );
        }
      }

      this.lifeCycleOptions = [
        ...new Set(lifeCycle.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.newnessOptions = [...new Set(newNess.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.brandOptions = [...new Set(brands.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.channelOptions = [...new Set(channels.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subChannelOptions = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getLifeCycle(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let newNess = [];
      let brands = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];
      this.$refs.newness.values = [];
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "getLifyClycle",
        value.map((item) => item.name)
      );
      this.lifeCycleValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            newNess.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.newness[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Newness"
                )
              )
            );
            brands.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.brand[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Brands"
                )
              )
            );
            channels.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.channel[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Channels"
                )
              )
            );
            subChannels.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.sub_channel[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Sub Channel"
                )
              )
            );
            categories.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.category[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Categories"
                )
              )
            );
            collections.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.collection[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Collections"
                )
              )
            );
            skus.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.lifeCycle.sku[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Sku"
                )
              )
            );
          }
        }
      }
      this.newnessOptions = [...new Set(newNess.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.brandOptions = [...new Set(brands.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.channelOptions = [...new Set(channels.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subChannelOptions = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getNewness(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let brands = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];
      let newNesses;
      this.$refs.brands.values = [];
      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.$emit(
        "newNess",
        value.map((item) => item.name)
      );
      this.newNessValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              brands.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.brand[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Brands"
                  )
                )
              );
              channels.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.channel[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Channels"
                  )
                )
              );
              subChannels.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.sub_channel[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Sub Channel"
                  )
                )
              );
              categories.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.category[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Categories"
                  )
                )
              );
              collections.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.collection[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Collections"
                  )
                )
              );
              skus.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.newness.sku[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Sku"
                  )
                )
              );
            }
          }
        }
      }

      this.brandOptions = [...new Set(brands.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.channelOptions = [...new Set(channels.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subChannelOptions = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },

    getChannelsByBrand(value) {
      this.$emit(
        "getBrands",
        value.map((item) => item.name)
      );
      this.brandValues = value.map((item) => item.name);
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let channels = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];

      this.$refs.channels.values = [];
      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];

      let productSources;
      let brandTypes;
      let lifeCycles;
      let newNesses;
      let brands;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brands = this.brandValues;
      } else {
        brands = this.brandOptions.map((item) => item.name);
      }

      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brands) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                channels.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.brands.channel[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Channels"
                    )
                  )
                );
                subChannels.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.brands.sub_channel[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Sub Channel"
                    )
                  )
                );
                categories.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.brands.category[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Categories"
                    )
                  )
                );
                collections.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.brands.collection[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Collections"
                    )
                  )
                );
                skus.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.brands.sku[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Sku"
                    )
                  )
                );
              }
            }
          }
        }
      }
      this.channelOptions = [...new Set(channels.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subChannelOptions = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getBrandByChannel(value) {
      this.$emit(
        "getChannels",
        value.map((item) => item.name)
      );
      this.channelValues = value.map((item) => item.name);
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };

      this.$refs.subChannels.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      let subChannels = [];
      let categories = [];
      let collections = [];
      let skus = [];

      let productSources;
      let brandTypes;
      let lifeCycles;
      let newNesses;
      let brands;
      let channels;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brands = this.brandValues;
      } else {
        brands = this.brandOptions.map((item) => item.name);
      }

      if (
        this.channelValues.length > 0 &&
        !this.channelValues.find((item) => item.includes("All"))
      ) {
        channels = this.channelValues;
      } else {
        channels = this.channelOptions.map((item) => item.name);
      }

      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brands) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let channel of channels) {
                  if (channel.indexOf("All") > -1) {
                    continue;
                  }
                  subChannels.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.channels.sub_channel[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}')`
                        ],
                        "All Sub Channel"
                      )
                    )
                  );
                  categories.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.channels.category[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}')`
                        ],
                        "All Categories"
                      )
                    )
                  );
                  collections.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.channels.collection[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}')`
                        ],
                        "All Collections"
                      )
                    )
                  );
                  skus.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.channels.sku[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}')`
                        ],
                        "All Sku"
                      )
                    )
                  );
                }
              }
            }
          }
        }
      }

      this.subChannelOptions = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getSelectedSubChannel(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let categories = [];
      let collections = [];
      let skus = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subChannelValues = value.map((item) => item.name);

      let productSources;
      let brandTypes;
      let lifeCycles;
      let newNesses;
      let brands;
      let channels;
      let subChannels;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brands = this.brandValues;
      } else {
        brands = this.brandOptions.map((item) => item.name);
      }

      if (
        this.channelValues.length > 0 &&
        !this.channelValues.find((item) => item.includes("All"))
      ) {
        channels = this.channelValues;
      } else {
        channels = this.channelOptions.map((item) => item.name);
      }

      if (
        this.subChannelValues.length > 0 &&
        !this.subChannelValues.find((item) => item.includes("All"))
      ) {
        subChannels = this.subChannelValues;
      } else {
        subChannels = this.subChannelOptions.map((item) => item.name);
      }

      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brands) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let channel of channels) {
                  if (channel.indexOf("All") > -1) {
                    continue;
                  }
                  for (let subC of subChannels) {
                    if (subC.indexOf("All") > -1) {
                      continue;
                    }
                    categories.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.subChannels.category[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}')`
                          ],
                          "All Categories"
                        )
                      )
                    );
                    collections.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.subChannels.collection[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}')`
                          ],
                          "All Collections"
                        )
                      )
                    );
                    skus.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.subChannels.sku[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}')`
                          ],
                          "All Sku"
                        )
                      )
                    );
                  }
                }
              }
            }
          }
        }
      }
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.$emit(
        "getSubChannelValues",
        value.map((item) => item.name)
      );
    },
    getSelectedCategories(value) {
      this.$emit(
        "getCategories",
        value.map((item) => item.name)
      );
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let collections = [];
      let skus = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.categoryValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newNesses;
      let brands;
      let channels;
      let subChannels;
      let categories;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brands = this.brandValues;
      } else {
        brands = this.brandOptions.map((item) => item.name);
      }

      if (
        this.channelValues.length > 0 &&
        !this.channelValues.find((item) => item.includes("All"))
      ) {
        channels = this.channelValues;
      } else {
        channels = this.channelOptions.map((item) => item.name);
      }

      if (
        this.subChannelValues.length > 0 &&
        !this.subChannelValues.find((item) => item.includes("All"))
      ) {
        subChannels = this.subChannelValues;
      } else {
        subChannels = this.subChannelOptions.map((item) => item.name);
      }
      if (
        this.categoryValues.length > 0 &&
        !this.categoryValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoryValues;
      } else {
        categories = this.categoryOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brands) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let channel of channels) {
                  if (channel.indexOf("All") > -1) {
                    continue;
                  }
                  for (let subC of subChannels) {
                    if (subC.indexOf("All") > -1) {
                      continue;
                    }
                    for (let categry of categories) {
                      if (categry.indexOf("All") > -1) {
                        continue;
                      }
                      collections.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.categories.collection[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}', '${categry}')`
                            ],
                            "All Collections"
                          )
                        )
                      );
                      skus.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.categories.sku[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}', '${categry}')`
                            ],
                            "All Sku"
                          )
                        )
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.collectionsOptions = [
        ...new Set(collections.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getSelectedCollections(value) {
      const optionGenerator = (data, keyName) => {
        return [
          { name: keyName },
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let skus = [];
      this.$refs.skus.values = [];
      this.collectionValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newNesses;
      let brands;
      let channels;
      let subChannels;
      let categories;
      let collections;
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      if (
        this.brandTypeValues.length > 0 &&
        !this.brandTypeValues.find((item) => item.includes("All"))
      ) {
        brandTypes = this.brandTypeValues;
      } else {
        brandTypes = this.brandTypeOptions.map((item) => item.name);
      }
      if (
        this.lifeCycleValues.length > 0 &&
        !this.lifeCycleValues.find((item) => item.includes("All"))
      ) {
        lifeCycles = this.lifeCycleValues;
      } else {
        lifeCycles = this.lifeCycleOptions.map((item) => item.name);
      }
      if (
        this.newNessValues.length > 0 &&
        !this.newNessValues.find((item) => item.includes("All"))
      ) {
        newNesses = this.newNessValues;
      } else {
        newNesses = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brands = this.brandValues;
      } else {
        brands = this.brandOptions.map((item) => item.name);
      }

      if (
        this.channelValues.length > 0 &&
        !this.channelValues.find((item) => item.includes("All"))
      ) {
        channels = this.channelValues;
      } else {
        channels = this.channelOptions.map((item) => item.name);
      }

      if (
        this.subChannelValues.length > 0 &&
        !this.subChannelValues.find((item) => item.includes("All"))
      ) {
        subChannels = this.subChannelValues;
      } else {
        subChannels = this.subChannelOptions.map((item) => item.name);
      }
      if (
        this.categoryValues.length > 0 &&
        !this.categoryValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoryValues;
      } else {
        categories = this.categoryOptions.map((item) => item.name);
      }
      if (
        this.collectionValues.length > 0 &&
        !this.collectionValues.find((item) => item.includes("All"))
      ) {
        collections = this.collectionValues;
      } else {
        collections = this.collectionsOptions.map((item) => item.name);
      }
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        for (let brandType of brandTypes) {
          if (brandType.indexOf("All") > -1) {
            continue;
          }
          for (let lifeC of lifeCycles) {
            if (lifeC.indexOf("All") > -1) {
              continue;
            }
            for (let newnss of newNesses) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brands) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let channel of channels) {
                  if (channel.indexOf("All") > -1) {
                    continue;
                  }
                  for (let subC of subChannels) {
                    if (subC.indexOf("All") > -1) {
                      continue;
                    }
                    for (let categry of categories) {
                      if (categry.indexOf("All") > -1) {
                        continue;
                      }
                      for (let colln of collections) {
                        if (colln.indexOf("All") > -1) {
                          continue;
                        }
                        skus.push(
                          ...new Set(
                            optionGenerator(
                              this.filterApiData.collections.sku[
                                `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${channel}', '${subC}', '${categry}', '${colln}')`
                              ],
                              "All Sku"
                            )
                          )
                        );
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
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
    const res = await this.$axios.$get("filter-all-options-dropdown-cache", {
      progress: true,
    });
    console.log("res", res);
    const optionGenerator = (data, keyName) => {
      return [
        { name: keyName },
        ...[...new Set(Object.values(data))].map((item) => {
          return { name: item };
        }),
      ];
    };
    this.productSourceOptions = optionGenerator(
      res.response.regular.product_source,
      "All Sources"
    );
    this.lifeCycleOptions = optionGenerator(
      res.response.regular.life_cycle,
      "All Life Cycles"
    );
    this.brandTypeOptions = optionGenerator(
      res.response.regular.brand_type,
      "All Brand Type"
    );
    this.newnessOptions = optionGenerator(
      res.response.regular.newness,
      "All Newness"
    );
    this.brandOptions = optionGenerator(
      res.response.regular.brand,
      "All Brands"
    );
    this.channelOptions = optionGenerator(
      res.response.regular.channel,
      "All Channels"
    );
    this.subChannelOptions = optionGenerator(
      res.response.regular.sub_channel,
      "All Sub Channels"
    );
    this.categoryOptions = optionGenerator(
      res.response.regular.category,
      "All Categories"
    );
    this.collectionsOptions = optionGenerator(
      res.response.regular.collection,
      "All Collections"
    );

    this.skuOptions = optionGenerator(res.response.regular.sku, "All SKUs");

    const allRegularFilterJSON = await this.$axios.$get(
      "/regular-filter-dropdown-cache",
      {
        progress: true,
      }
    );
    this.filterApiData = allRegularFilterJSON.response;
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
