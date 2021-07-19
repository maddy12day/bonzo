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
        :class="showChannelError? 'border border-danger rounded': ''"
        ref="channels"
      />
      <p v-if="showChannelError" class="text-left text-danger small">Please select single channel</p>
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
    };
  },
  computed: {
    showChannelErrorCom() {
      console.log(this.showChannelError)
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
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let brandType = [];
      let lifeCycle = [];
      let newNess = [];
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];
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
      if (
        this.productSourceValues.length > 0 &&
        !this.productSourceValues.find((item) => item.includes("All"))
      ) {
        productSources = this.productSourceValues;
      } else {
        productSources = this.productSourceOptions.map((item) => item.name);
      }
      this.productSourceValues = value.map((item) => item.name);
      for (let psource of productSources) {
        if (psource.indexOf("All") > -1) {
          continue;
        }
        brandType.push(
          ...this.filterApiData.programSource.brand_type[`${psource}`]
        );
        lifeCycle.push(
          ...this.filterApiData.programSource.life_cycle[`${psource}`]
        );
        newNess.push(...this.filterApiData.programSource.newness[`${psource}`]);
        brands.push(...this.filterApiData.programSource.brand[`${psource}`]);
        programs.push(...this.filterApiData.programSource.collab[`${psource}`]);
        channels.push(
          ...this.filterApiData.programSource.channel[`${psource}`]
        );
        subChannels.push(
          ...this.filterApiData.programSource.sub_channel[`${psource}`]
        );
        categories.push(
          ...this.filterApiData.programSource.category[`${psource}`]
        );
        classes.push(...this.filterApiData.programSource.class[`${psource}`]);
        subClasses.push(
          ...this.filterApiData.programSource.sub_class[`${psource}`]
        );
        collections.push(
          ...this.filterApiData.programSource.collection[`${psource}`]
        );
        skus.push(...this.filterApiData.programSource.sku[`${psource}`]);
      }
      this.brandTypeOptions = optionGenerator(brandType, "All Brand Types");
      this.lifeCycleOptions = optionGenerator(lifeCycle, "All Life Cycles");
      this.newnessOptions = optionGenerator(newNess, "All Newness");
      this.programs = optionGenerator(programs, "All Channels");

      this.brandOptions = optionGenerator(brands, "All Brands");
      this.channelOptions = optionGenerator(channels, "All Channels");
      this.programSubChannels = optionGenerator(
        subChannels,
        "All Sub Channels"
      );
      this.categoryOptions = optionGenerator(categories, "All Categories");
      this.classesOptions = optionGenerator(classes, "All Classes");
      this.subClassesOptions = optionGenerator(subClasses, "All Sub Classes");
      this.programCollectionsOptions = optionGenerator(
        collections,
        "All Collections"
      );
      this.skuOptions = optionGenerator(skus, "All SKUs");
    },
    getBrandType(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let lifeCycle = [];
      let newNess = [];
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

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
                this.filterApiData.programType.life_cycle[
                  `('${psource}', '${brandType}')`
                ],
                "All Life Cycles"
              )
            )
          );
          newNess.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.newness[
                  `('${psource}', '${brandType}')`
                ],
                "All Newness"
              )
            )
          );
          brands.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.brand[
                  `('${psource}', '${brandType}')`
                ],
                "All Brands"
              )
            )
          );
          programs.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.collab[
                  `('${psource}', '${brandType}')`
                ],
                "All Programs"
              )
            )
          );
          channels.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.channel[
                  `('${psource}', '${brandType}')`
                ],
                "All Channels"
              )
            )
          );
          subChannels.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.sub_channel[
                  `('${psource}', '${brandType}')`
                ],
                "All Sub Channel"
              )
            )
          );
          categories.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.category[
                  `('${psource}', '${brandType}')`
                ],
                "All Categories"
              )
            )
          );
          classes.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.class[
                  `('${psource}', '${brandType}')`
                ],
                "All Classes"
              )
            )
          );
          subClasses.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.sub_class[
                  `('${psource}', '${brandType}')`
                ],
                "All Sub Classes"
              )
            )
          );
          collections.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.collection[
                  `('${psource}', '${brandType}')`
                ],
                "All Collections"
              )
            )
          );
          skus.push(
            ...new Set(
              optionGenerator(
                this.filterApiData.programType.sku[
                  `('${psource}', '${brandType}')`
                ],
                "All Skus"
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
      this.programs = [...new Set(programs.map((item) => item.name))].map(
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
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let newNess = [];
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

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
                  this.filterApiData.programLifeCycle.newness[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Newness"
                )
              )
            );
            brands.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.brand[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Brands"
                )
              )
            );
            programs.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.collab[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Programs"
                )
              )
            );
            channels.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.channel[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Channels"
                )
              )
            );
            subChannels.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.sub_channel[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Sub Channel"
                )
              )
            );
            categories.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.category[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Categories"
                )
              )
            );
            classes.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.class[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Classes"
                )
              )
            );
            subClasses.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.sub_class[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Sub Classes"
                )
              )
            );
            collections.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.collection[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Collections"
                )
              )
            );
            skus.push(
              ...new Set(
                optionGenerator(
                  this.filterApiData.programLifeCycle.sku[
                    `('${psource}', '${brandType}', '${lifeC}')`
                  ],
                  "All Skus"
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
      this.programs = [...new Set(programs.map((item) => item.name))].map(
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
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              brands.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.brand[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Brands"
                  )
                )
              );
              programs.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.collab[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Programs"
                  )
                )
              );
              channels.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.channel[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Channels"
                  )
                )
              );
              subChannels.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.sub_channel[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Sub Channel"
                  )
                )
              );
              categories.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.category[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Categories"
                  )
                )
              );
              classes.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.class[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Classes"
                  )
                )
              );
              subClasses.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.sub_class[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Sub Classes"
                  )
                )
              );
              collections.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.collection[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Collections"
                  )
                )
              );
              skus.push(
                ...new Set(
                  optionGenerator(
                    this.filterApiData.programNewness.sku[
                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}')`
                    ],
                    "All Skus"
                  )
                )
              );
            }
          }
        }
      }
      this.programs = [...new Set(programs.map((item) => item.name))].map(
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
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getAppliedFilters(value) {
      this.$emit("appliedFilters");
      this.$store.commit("toggleProgramFilterCTAState");
      this.$store.commit("toggleStatsAPIResponseState",false);
    },
    getSelectedBrands(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let brands = [];
      let programs = [];
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

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
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                programs.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.collab[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Programs"
                    )
                  )
                );
                channels.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.channel[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Channels"
                    )
                  )
                );
                subChannels.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.sub_channel[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Sub Channel"
                    )
                  )
                );
                categories.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.category[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Categories"
                    )
                  )
                );
                classes.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.class[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Classes"
                    )
                  )
                );
                subClasses.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.sub_class[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Sub Classes"
                    )
                  )
                );
                collections.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.collection[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Collections"
                    )
                  )
                );
                skus.push(
                  ...new Set(
                    optionGenerator(
                      this.filterApiData.programbrands.sku[
                        `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}')`
                      ],
                      "All Skus"
                    )
                  )
                );
              }
            }
          }
        }
      }
      this.programs = [...new Set(programs.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.channelOptions = [...new Set(channels.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getSelectedPrograms(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let channels = [];
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];
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
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
                    continue;
                  }
                  channels.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.channel[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Channels"
                      )
                    )
                  );
                  subChannels.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.sub_channel[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Sub Channel"
                      )
                    )
                  );
                  categories.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.category[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Categories"
                      )
                    )
                  );
                  classes.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.class[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Classes"
                      )
                    )
                  );
                  subClasses.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.sub_class[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Sub Classes"
                      )
                    )
                  );
                  collections.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.collection[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Collections"
                      )
                    )
                  );
                  skus.push(
                    ...new Set(
                      optionGenerator(
                        this.filterApiData.programCollabs.sku[
                          `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}')`
                        ],
                        "All Skus"
                      )
                    )
                  );
                }
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
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getSelectProgramChannels(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let subChannels = [];
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];

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
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
                    continue;
                  }
                  for (let channel of channels) {
                    if (channel.indexOf("All") > -1) {
                      continue;
                    }
                    subChannels.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.sub_channel[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Sub Channel"
                        )
                      )
                    );
                    categories.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.category[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Categories"
                        )
                      )
                    );
                    classes.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.class[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Classes"
                        )
                      )
                    );
                    subClasses.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.sub_class[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Sub Classes"
                        )
                      )
                    );
                    collections.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.collection[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Collections"
                        )
                      )
                    );
                    skus.push(
                      ...new Set(
                        optionGenerator(
                          this.filterApiData.programChannels.sku[
                            `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}')`
                          ],
                          "All Skus"
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
      this.programSubChannels = [
        ...new Set(subChannels.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getSelectPrograChannelsSubChannels(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let categories = [];
      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];
      this.$refs.classes.values = [];
      this.$refs.subClasses.values = [];
      this.$refs.categories.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subChannelValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let subChannels;
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
        subChannels = this.programSubChannels.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
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
                            this.filterApiData.programSubChannels.category[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}')`
                            ],
                            "All Categories"
                          )
                        )
                      );
                      classes.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.programSubChannels.class[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}')`
                            ],
                            "All Classes"
                          )
                        )
                      );
                      subClasses.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.programSubChannels.sub_class[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}')`
                            ],
                            "All Sub Classes"
                          )
                        )
                      );
                      collections.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.programSubChannels.collection[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}')`
                            ],
                            "All Collections"
                          )
                        )
                      );
                      skus.push(
                        ...new Set(
                          optionGenerator(
                            this.filterApiData.programSubChannels.sku[
                              `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}')`
                            ],
                            "All Skus"
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
      this.categoryOptions = [
        ...new Set(categories.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getSelectedCategories(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };

      let classes = [];
      let subClasses = [];
      let collections = [];
      let skus = [];
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
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let subChannels;
      let categories = [];
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
        subChannels = this.programSubChannels.map((item) => item.name);
      }
      if (
        this.categoriesValues.length > 0 &&
        !this.categoriesValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoriesValues;
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
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
                      for (let category of categories) {
                        if (category.indexOf("All") > -1) {
                          continue;
                        }
                        classes.push(
                          ...new Set(
                            optionGenerator(
                              this.filterApiData.programCategories.class[
                                `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}')`
                              ],
                              "All Classes"
                            )
                          )
                        );
                        subClasses.push(
                          ...new Set(
                            optionGenerator(
                              this.filterApiData.programCategories.sub_class[
                                `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}')`
                              ],
                              "All Sub Classes"
                            )
                          )
                        );
                        collections.push(
                          ...new Set(
                            optionGenerator(
                              this.filterApiData.programCategories.collection[
                                `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}')`
                              ],
                              "All Collections"
                            )
                          )
                        );
                        skus.push(
                          ...new Set(
                            optionGenerator(
                              this.filterApiData.programCategories.sku[
                                `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}')`
                              ],
                              "All Skus"
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
      this.classesOptions = [...new Set(classes.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
    getCategoryClasses(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let subClasses = [];
      let collections = [];
      let skus = [];
      this.$refs.subClasses.values = [];
      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.classesValues = value.map((item) => item.name);
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let subChannels;
      let categories;
      let classess = [];
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
        subChannels = this.programSubChannels.map((item) => item.name);
      }
      if (
        this.categoriesValues.length > 0 &&
        !this.categoriesValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoriesValues;
      } else {
        categories = this.categoryOptions.map((item) => item.name);
      }
      if (
        this.classesValues.length > 0 &&
        !this.classesValues.find((item) => item.includes("All"))
      ) {
        classess = this.classesValues;
      } else {
        classess = this.classesOptions.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
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
                      for (let category of categories) {
                        if (category.indexOf("All") > -1) {
                          continue;
                        }
                        for (let classes of classess) {
                          if (classes.indexOf("All") > -1) {
                            continue;
                          }
                          subClasses.push(
                            ...new Set(
                              optionGenerator(
                                this.filterApiData.programClasses.sub_class[
                                  `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}')`
                                ],
                                "All Sub Classes"
                              )
                            )
                          );
                          collections.push(
                            ...new Set(
                              optionGenerator(
                                this.filterApiData.programClasses.collection[
                                  `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}')`
                                ],
                                "All Collections"
                              )
                            )
                          );
                          skus.push(
                            ...new Set(
                              optionGenerator(
                                this.filterApiData.programClasses.sku[
                                  `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}')`
                                ],
                                "All Skus"
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
      }
      this.subClassesOptions = [
        ...new Set(subClasses.map((item) => item.name)),
      ].map((item) => {
        return { name: item };
      });
      this.programCollectionsOptions = [
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
        "getClass",
        value.map((item) => item.name)
      );
    },
    classesSubClasses(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };
      let collections = [];
      let skus = [];

      this.$refs.collections.values = [];
      this.$refs.skus.values = [];
      this.subClassValues = value.map((item) => item.name);
      this.$emit(
        "getSubClass",
        value.map((item) => item.name)
      );
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let subChannels;
      let categories;
      let classess;
      let subClasses;
      let brnds;
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
        subChannels = this.programSubChannels.map((item) => item.name);
      }
      if (
        this.categoriesValues.length > 0 &&
        !this.categoriesValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoriesValues;
      } else {
        categories = this.categoryOptions.map((item) => item.name);
      }
      if (
        this.classesValues.length > 0 &&
        !this.classesValues.find((item) => item.includes("All"))
      ) {
        classess = this.classesValues;
      } else {
        classess = this.classesOptions.map((item) => item.name);
      }
      if (
        this.subClassValues.length > 0 &&
        !this.subClassValues.find((item) => item.includes("All"))
      ) {
        subClasses = this.subClassValues;
      } else {
        subClasses = this.subClassesOptions.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
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
                      for (let category of categories) {
                        if (category.indexOf("All") > -1) {
                          continue;
                        }
                        for (let classes of classess) {
                          if (classes.indexOf("All") > -1) {
                            continue;
                          }
                          for (let subCls of subClasses) {
                            if (subCls.indexOf("All") > -1) {
                              continue;
                            }
                            collections.push(
                              ...new Set(
                                optionGenerator(
                                  this.filterApiData.programSubClasses
                                    .collection[
                                    `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}', '${subCls}')`
                                  ],
                                  "All Collections"
                                )
                              )
                            );
                            skus.push(
                              ...new Set(
                                optionGenerator(
                                  this.filterApiData.programSubClasses.sku[
                                    `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}', '${subCls}')`
                                  ],
                                  "All Skus"
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
        }
      }
      this.programCollectionsOptions = [
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
    subClaasesCollections(value) {
      const optionGenerator = (data, keyName) => {
        return [
          /* { name: keyName }, */
          ...[...new Set(data)].map((item) => {
            return { name: item };
          }),
        ];
      };

      let skus = [];
      this.$refs.skus.values = [];
      this.collectionValues = value.map((item) => item.name);

      this.$emit(
        "getCollection",
        value.map((item) => item.name)
      );
      let productSources;
      let brandTypes;
      let lifeCycles;
      let newness;
      let brands;
      let programs;
      let channels;
      let subChannels;
      let categories;
      let classess;
      let subClasses;
      let brnds;
      let collections = [];
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
        this.newnessValues.length > 0 &&
        !this.newnessValues.find((item) => item.includes("All"))
      ) {
        newness = this.newnessValues;
      } else {
        newness = this.newnessOptions.map((item) => item.name);
      }
      if (
        this.brandValues.length > 0 &&
        !this.brandValues.find((item) => item.includes("All"))
      ) {
        brnds = this.brandValues;
      } else {
        brnds = this.brandOptions.map((item) => item.name);
      }
      if (
        this.programValues.length > 0 &&
        !this.programValues.find((item) => item.includes("All"))
      ) {
        programs = this.programValues;
      } else {
        programs = this.programs.map((item) => item.name);
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
        subChannels = this.programSubChannels.map((item) => item.name);
      }
      if (
        this.categoriesValues.length > 0 &&
        !this.categoriesValues.find((item) => item.includes("All"))
      ) {
        categories = this.categoriesValues;
      } else {
        categories = this.categoryOptions.map((item) => item.name);
      }
      if (
        this.classesValues.length > 0 &&
        !this.classesValues.find((item) => item.includes("All"))
      ) {
        classess = this.classesValues;
      } else {
        classess = this.classesOptions.map((item) => item.name);
      }
      if (
        this.subClassValues.length > 0 &&
        !this.subClassValues.find((item) => item.includes("All"))
      ) {
        subClasses = this.subClassValues;
      } else {
        subClasses = this.subClassesOptions.map((item) => item.name);
      }
      if (
        this.collectionValues.length > 0 &&
        !this.collectionValues.find((item) => item.includes("All"))
      ) {
        collections = this.collectionValues;
      } else {
        collections = this.programCollectionsOptions.map((item) => item.name);
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
            for (let newnss of newness) {
              if (newnss.indexOf("All") > -1) {
                continue;
              }
              for (let brnd of brnds) {
                if (brnd.indexOf("All") > -1) {
                  continue;
                }
                for (let program of programs) {
                  if (program.indexOf("All") > -1) {
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
                      for (let category of categories) {
                        if (category.indexOf("All") > -1) {
                          continue;
                        }
                        for (let classes of classess) {
                          if (classes.indexOf("All") > -1) {
                            continue;
                          }
                          for (let subCls of subClasses) {
                            if (subCls.indexOf("All") > -1) {
                              continue;
                            }
                            for (let colln of collections) {
                              if (colln.indexOf("All") > -1) {
                                continue;
                              }
                              skus.push(
                                ...new Set(
                                  optionGenerator(
                                    this.filterApiData.programCollections.sku[
                                      `('${psource}', '${brandType}', '${lifeC}', '${newnss}', '${brnd}', '${program}', '${channel}', '${subC}', '${category}', '${classes}', '${subCls}', '${colln}')`
                                    ],
                                    "All Skus"
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
          }
        }
      }
      this.skuOptions = [...new Set(skus.map((item) => item.name))].map(
        (item) => {
          return { name: item };
        }
      );
    },
    getSelectedSkus(skus) {
      this.skuValues = skus.map((sku) => sku.name.split(":")[0]);
      this.$emit("getSkusValues", this.skuValues);
    },
  },
  async mounted() {
    
     const allRegularFilterJSON = await this.$axios.$get(
       "/program-filter-dropdown-cache",
       {
         progress: true,
       }
     );
       this.filterApiData = allRegularFilterJSON.response;
       const res = await this.$axios.$get("filter-all-options-dropdown-cache", {
         progress: true,
       });
       const optionGenerator = (data, keyName) => {
         return [
/*            { name: keyName }, */
           ...[...new Set(Object.values(data))].map((item) => {
             return { name: item };
           }),
         ];
       };
       this.productSourceOptions = optionGenerator(
         res.response.program.product_source,
         "All Sources"
       );
       this.lifeCycleOptions = optionGenerator(
         res.response.program.life_cycle,
         "All Life Cycles"
       );
       this.brandTypeOptions = optionGenerator(
         res.response.program.brand_type,
         "All Brand Type"
       );
       this.newnessOptions = optionGenerator(
         res.response.program.newness,
         "All Newness"
       );
       this.programs = optionGenerator(
         res.response.program.collab,
         "All Programs"
       );
       this.channelOptions = optionGenerator(
         res.response.program.channel,
         "All Channels"
       );
       this.programSubChannels = optionGenerator(
         res.response.program.sub_channel,
         "All Sub Channels"
       );
       this.categoryOptions = optionGenerator(
         res.response.program.category,
         "All Categories"
       );
       this.classesOptions = optionGenerator(
         res.response.program.class,
         "All Classes"
       );
       this.subClassesOptions = optionGenerator(
         res.response.program.sub_class,
         "All Sub Classes"
       );
       this.programCollectionsOptions = optionGenerator(
         res.response.program.collection,
         "All Collections"
       );
       this.skuOptions = optionGenerator(res.response.program.sku, "All SKUs");
       this.brandOptions = optionGenerator(
         res.response.program.brand,
         "All Brands"
       );
  }
  
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.applyFilterBtn {
  height: 43px;
}
</style>
