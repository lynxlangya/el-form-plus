<template>
  <div>
    <section>
      <el-button @click="handleCreate">新增</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="time"
          label="日期">
          <template slot-scope="scope">
            {{ _handleFormatTime(scope.row.time) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编">
        </el-table-column>
        <el-table-column
          prop="step"
          label="计步器">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-drawer
      :title="DrTitle === 'create' ? '新增' : DrTitle === 'edit' ? '编辑' : '查看'"
      :visible.sync="dialogVisible"
      size="50%"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <ElFormPlus
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :rules="formInfo.rules"
        :fieldList="formInfo.fieldList"
        :list-config="listConfig"
        :all-disabled="DrTitle"
        @handleEvent="handleEvent"
      />
      <div class="demo-drawer__footer">
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="handleConfirm"
        >{{ btnLoading ? '提交中 ...' : '确 定' }}</el-button>
        <el-button @click="handleCancel">取 消</el-button>
    </div>
    </el-drawer>
  </div>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝示例
 * @copyright 🤝这个世界，一些人赢在了不像别人，一些人输在了不像自己。
 */
import dayjs from 'dayjs'
import ElFormPlus from './components/ElFormPlus';
import { FormInfo } from './components/data'
export default {
  name: 'App',
  components: {
    ElFormPlus,
  },
  data: () => ({
    dialogVisible: false,
    DrTitle: 'create',
    formInfo: {...FormInfo},
    btnLoading: false,
    listConfig: {
      sexList: [
        { id: 1, name: '男' },
        { id: 2, name: '女' },
        { id: 3, name: '保密' },
      ],
    },
    tableData: [
      {
        name: 'MARS',
        age: 24,
        time: 'Thu, 23 Jul 2020 06:43:10 GMT',
        address: '北京市中南海',
        zip: '101100',
        daterange: ['Thu, 1 Jul 2020 06:43:10 GMT', 'Thu, 28 Jul 2020 06:43:10 GMT'],
        sex: 1,
        step: 9
      }
    ]
  }),
  watch: {
    dialogVisible (bool) {
      this.$nextTick(() => {
        const formRule = this.formInfo.ref
        if (!bool) {
          formRule.resetFields()
          this.btnLoading = false
        }
      })
    }
  },
  methods: {
    handleCreate() {
      this.DrTitle = 'create';
      this.dialogVisible = true;
    },
    handleUpdate(row) {
      this.DrTitle = 'edit'
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.formInfo.data = {...row}
      })
    },
    handleView(row) {
      this.DrTitle = 'view'
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.formInfo.data = {...row}
      })
    },
    handleEvent (row) {
      console.log(row);
    },
    handleConfirm () {
      const query = {...this.formInfo.data}
      this.formInfo.ref.validate(async valid => {
        if (valid) {
          this.btnLoading = true
          setTimeout(() => {
            this.btnLoading = false
            this.tableData.push({...query})
            this.dialogVisible = false
          }, 1000);
        }
      })
    },
    handleCancel() {
      this.dialogVisible = false
    },
    _handleFormatTime (time) {
      return time !== null ? dayjs(time).format('YYYY-MM-DD') : '-'
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/:focus{outline:0;}
.demo-drawer__footer {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
// .content {
//   display: flex;
//   justify-content: space-around;
// }
</style>
