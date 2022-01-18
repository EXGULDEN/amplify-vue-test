<template>
  <el-container>
      <my-header></my-header>
      <el-main>
          <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>

 .el-main {
    background-color: #08737a;
    text-align: center;
  }
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>