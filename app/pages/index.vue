<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- 个人信息卡片 -->
      <UCard class="mb-8">
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ profileStore.personalInfo.name }}</h1>
            <UBadge color="primary" variant="subtle">{{ profileStore.personalInfo.position }}</UBadge>
          </div>
        </template>
        
        <div class="space-y-4">
          <!-- 基本信息 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-user-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">{{ profileStore.personalInfo.gender }} | {{ profileStore.personalInfo.age }}岁</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-phone-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">{{ profileStore.personalInfo.phone }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-envelope-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">{{ profileStore.personalInfo.email }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-briefcase-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">{{ profileStore.personalInfo.experience }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-currency-dollar-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">期望薪资：{{ profileStore.personalInfo.expectedSalary }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-map-pin-solid" class="w-5 h-5 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300">期望城市：{{ profileStore.personalInfo.expectedCity }}</span>
            </div>
          </div>

          <!-- 个人优势 -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">个人优势</h2>
            <ul class="space-y-2">
              <li v-for="(advantage, index) in profileStore.advantages" :key="index" 
                  class="flex items-start space-x-2">
                <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700 dark:text-gray-300">{{ advantage }}</span>
              </li>
            </ul>
          </div>

          <!-- 工作经历 -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">工作经历</h2>
            <div class="space-y-4">
              <UCard v-for="(work, index) in profileStore.workExperiences" :key="index" class="bg-gray-50 dark:bg-gray-800">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ work.company }}</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ work.position }}</p>
                  </div>
                  <UBadge color="gray" variant="subtle" class="mt-2 md:mt-0">{{ work.period }}</UBadge>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mt-2">{{ work.description }}</p>
              </UCard>
            </div>
          </div>

          <!-- 教育经历 -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">教育经历</h2>
            <UCard class="bg-gray-50 dark:bg-gray-800">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ profileStore.education.school }}</h3>
                  <p class="text-gray-600 dark:text-gray-400">{{ profileStore.education.degree }} | {{ profileStore.education.major }}</p>
                </div>
                <UBadge color="gray" variant="subtle" class="mt-2 md:mt-0">{{ profileStore.education.period }}</UBadge>
              </div>
            </UCard>
          </div>
        </div>
      </UCard>

      <!-- 项目列表 -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">项目经历</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard 
            v-for="project in profileStore.projects" 
            :key="project.id"
            class="hover:shadow-lg transition-shadow cursor-pointer"
            @click="navigateToProject(project.id)"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <UBadge color="primary" variant="subtle">{{ project.role }}</UBadge>
              </div>
            </template>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-heroicons-calendar-solid" class="w-4 h-4" />
                <span>{{ project.period }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300 line-clamp-3">{{ project.description }}</p>
              <div class="pt-2">
                <UButton 
                  color="primary" 
                  variant="ghost" 
                  size="sm"
                  @click.stop="navigateToProject(project.id)"
                >
                  查看详情
                  <UIcon name="i-heroicons-arrow-right-solid" class="w-4 h-4 ml-1" />
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '../../stores/profile'

const profileStore = useProfileStore()

const navigateToProject = (id: string) => {
  navigateTo(`/projects/${id}`)
}

// SEO
useHead({
  title: '李耀威 - 个人项目介绍',
  meta: [
    { name: 'description', content: '李耀威的个人项目介绍网站，展示工作经历和项目作品' }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>
