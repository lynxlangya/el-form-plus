<template>
  <el-form
    ref="ElFormPlus"
    class="page-form"
    status-icon
    :model="data"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth"
  >
    <template v-for="(item, index) in getFieldList()">
      <el-form-item
        v-if="item.type !== 'hide'"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :class="item.className"
        :style="{ width: `calc(100%/${count} - 20px)` }"
      >
        <!-- solt -->
        <template v-if="item.type === 'slot'">
          <slot :name="'form-' + item.value" />
        </template>
        <!-- 普通输入框 -->
        <el-input
          v-if="item.type === 'input' || item.type === 'password'"
          v-model="data[item.value]"
          clearable
          autocomplete="new-password"
          :size="formSize"
          :maxlength="item.maxlength || 50"
          :show-password="item.type === 'password'"
          :type="item.type"
          :disabled="item.disabled"
          :placeholder="getPlaceholder(item)"
          @blur="handleEvent($event, item.value)"
        />
        <!-- 文本输入框 -->
        <el-input
          v-if="item.type === 'textarea'"
          v-model="data[item.value]"
          :size="formSize"
          :maxlength="item.maxlength || 50"
          :type="item.type"
          :disabled="item.disabled"
          :placeholder="getPlaceholder(item)"
          :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
          @blur="handleEvent($event, item.value)"
        />
        <!-- 计数器 -->
        <el-input-number
          v-if="item.type === 'inputNumber'"
          v-model="data[item.value]"
          :size="formSize"
          v-bind="item"
          @change="handleEvent($event, item.value, 'change')"
        />
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="data[item.value]"
          :size="formSize"
          v-bind="item"
          :placeholder="getPlaceholder(item)"
          @change="handleEvent($event, item.value, 'change')"
        >
          <el-option
            v-for="childItem in listConfig[item.list]"
            :key="childItem.id"
            :label="childItem.name"
            :value="childItem.id"
            :disabled="childItem.disabled"
          />
        </el-select>
        <!-- 日期选择框 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="data[item.value]"
          v-bind="item"
          :type="item.dateType"
          size="mini"
          style="width: 100%;"
          start-placeholder="开始"
          end-placeholder="结束"
          :placeholder="getPlaceholder(item)"
          @change="handleEvent($event, item.value, 'change')"
        />
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝form 组件
 * @copyright 🤝这个世界，一些人赢在了不像别人，一些人输在了不像自己。
 */
// import _ from 'lodash'
export default {
  name: 'ElFormPlus',
  props: {
    /** 实例 */
    refObj: {
      type: Object,
      default: () => ({}),
    },
    /** 表单数据 */
    data: {
      type: Object,
      default: () => ({}),
    },
    /** 验证规则 */
    rules: {
      type: Object,
      default: () => ({}),
    },
    /** 表单相关字段配置 */
    fieldList: {
      type: Array,
      default: () => [],
    },
    /** 表单列表配置 */
    listConfig: {
      type: Object,
      default: () => ({}),
    },
    /** label 宽度 */
    labelWidth: {
      type: String,
      default: '100px',
    },
    /** label 位置 */
    labelPosition: {
      type: String,
      default: 'left',
    },
    /** 全部禁用 */
    allDisabled: {
      type: String,
      default: null,
    },
    /** 列数量 */
    count: {
      type: [Number, String],
      default: 2,
    },
    /** 大小 */
    formSize: {
      type: String,
      default: 'mini',
    },
  },
  watch: {
    data: {
      handler() {
        this.$emit('update:refObj', this.$refs.ElFormPlus);
      },
      deep: true,
    },
  },
  mounted() {
    this.$emit('update:refObj', this.$refs.ElFormPlus);
  },

  methods: {
    getFieldList() {
      let resolveList = JSON.parse(JSON.stringify(this.fieldList))
      // let resolveList = _.cloneDeep(this.fieldList)
      if (this.allDisabled === 'view') {
        resolveList.map(item => item.disabled = true)
      } else {
        resolveList.map(item => {
          if (!item.disabled) item.disabled = false
        })
      }
      return resolveList.filter(
        (item) => !item.show || (item.show && item.show)
      )
    },
    /**
     * @method 判断placeholder显示内容
     * @param {Object} row
     * @returns {String} placeholder
     * @desc 📝默认显示内容提示
     */
    getPlaceholder(row) {
      let placeholder;
      if (
        row.type === 'input' ||
        row.type === 'textarea' ||
        row.type === 'password'
      ) {
        placeholder = '请输入' + row.label;
      } else if (
        row.type === 'select' ||
        row.type === 'time' ||
        row.type === 'date'
      ) {
        placeholder = '请选择' + row.label;
      } else {
        placeholder = row.label;
      }
      return placeholder;
    },

    /**
     * @method 绑定相关事件
     * @param {Event} event
     * @param {String | Number} val
     * @param {String} change
     * @desc 📝事件处理, 当前form项失去焦点时, 获取 value 值和 字段名称
     * @desc 📝change 事件特殊处理: change 只能拿到选中值. 此时的 event 为选中值的 value
     */
    handleEvent(event, val, change) {
      let obj = {
        value: change === 'change' ? event : event.target.value,
        label: val,
      };
      this.$emit('handleEvent', obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin: 0 10px 20px 10px;
  display: inline-block;
  .el-form-item__content {
    .el-input,
    .el-select,
    .el-textarea {
      width: 100%;
    }
    .el-input-number {
      .el-input {
        width: inherit;
      }
    }
  }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-textarea {
        width: 100%;
      }
    }
  }
}
</style>
