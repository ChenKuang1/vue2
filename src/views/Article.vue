<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-button type="primary" size="mini" style="margin-bottom:10px" @click="dialogVisible = true">添加</el-button>
    <el-input placeholder="请输入内容" clearable v-model="pageparam.key" class="input-with-select" size="mini"
      style="width:130px;margin-right:10px;margin-left:30px;"></el-input>

    <el-button slot="append" icon="el-icon-search" size="mini" @click="search()"></el-button>
    <el-table :data="tableData" border>
      <el-table-column prop="create_time" label="日期" width="160">
      </el-table-column>
      <el-table-column prop="title" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
      <el-table-column prop="status" label="狀態">
        <template slot-scope="s">
          <span v-if="(s.row.status == 0)">开启</span>
          <span v-if="(s.row.status == 1)">关闭</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="data">
          <el-button type="primary" size="mini" @click="edit(data.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(data.row.id)">删除</el-button>

        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[2, 3, 4, 5]" :page-size="pageparam.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 文章添加 -->
    <el-dialog title="添加文章" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章狀態" :label-width="formLabelWidth">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 文章编辑 -->
    <el-dialog title="添加文章" :visible.sync="editdialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="editform">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="editform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editform.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章狀態" :label-width="formLabelWidth">
          <el-switch v-model="editform.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsave()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      total: 0,
      pageparam: {
        key: '',
        page: 1,
        limit: 5
      },
      dialogVisible: false,
      editdialogVisible: false,
      formLabelWidth: '100px',
      form: {
        title: '',
        content: '',
        status:0
      },
      editform: {
        id: '',
        title: '',
        content: '',
        status:1
      }

    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.$axios.post('http://www.api.com/api/article/index', this.pageparam)
        .then(res => {
          this.tableData = res.data.info
          this.total = res.data.total
          console.log(this)
        })
        .catch(error => {
          console.log(error)
        })
    },
    edit(info) {
      this.editdialogVisible = true
      this.editform.id = info.id
      this.editform.title = info.title
      this.editform.content = info.content
      this.editform.status = info.status
    },
    editsave() {
      this.$axios.post('http://www.api.com/api/article/edit', this.editform)
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success('编辑成功！')
            this.editdialogVisible = false
            this.editform.id = ''
            this.editform.title = ''
            this.editform.content = ''
            this.editform.status = 0
            this.getlist()
          } else {
            this.$message.error('编辑失败！')
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    del(id) {
      //console.log(id)
      this.$axios.post('http://www.api.com/api/article/delete', { 'id': id })
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success('删除成功！')
            this.getlist()
          } else {
            this.$message.error('删除失败！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    search() {
      this.$axios.post('http://www.api.com/api/article/index', this.pageparam)
        .then(res => {
          this.getlist()
        }
        )
        .catch(error => {
          console.log(error)
        })
    },
    add() {
      this.dialogVisible = false
      this.$axios.post('http://www.api.com/api/article/save', this.form)
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success('添加成功！')
            this.form.title = ''
            this.form.content = ''
            this.form.status = 0
            this.getlist()
          } else {
            this.$message.error('添加失败！')
          }
        }
        )
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange(val) {
      this.pageparam.limit = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.pageparam.page = val
      this.getlist()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
}

</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  text-align: center;

}
</style>
