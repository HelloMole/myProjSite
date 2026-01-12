<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <UButton 
          color="gray" 
          variant="ghost" 
          icon="i-heroicons-arrow-left-solid"
          @click="navigateTo('/')"
        >
          返回首页
        </UButton>
      </div>

      <!-- 项目详情 -->
      <div v-if="project">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h1>
              <UBadge color="primary" variant="subtle">{{ project.role }}</UBadge>
            </div>
          </template>

          <div class="space-y-6">
            <!-- 项目基本信息 -->
            <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-calendar-solid" class="w-5 h-5" />
                <span>{{ project.period }}</span>
              </div>
            </div>

            <!-- 项目描述 -->
            <div>
              <h2 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">项目描述</h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ project.description }}</p>
            </div>

            <!-- 项目业绩 -->
            <div>
              <h2 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">项目业绩</h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ project.achievements }}</p>
            </div>

            <!-- 项目链接 -->
            <div v-if="project.link || project.demoLink" class="flex flex-wrap gap-3">
              <UButton 
                v-if="project.link"
                color="primary"
                variant="solid"
                icon="i-heroicons-link-solid"
                :to="project.link"
                external
                target="_blank"
              >
                查看项目
              </UButton>
              <UButton 
                v-if="project.demoLink"
                color="green"
                variant="solid"
                icon="i-heroicons-play-circle-solid"
                :to="project.demoLink"
                external
                target="_blank"
              >
                查看演示
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 项目不存在 -->
      <UCard v-else>
        <div class="text-center py-12">
          <UIcon name="i-heroicons-exclamation-triangle-solid" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">项目未找到</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">抱歉，未找到对应的项目信息</p>
          <UButton color="primary" @click="navigateTo('/')">返回首页</UButton>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '../../../stores/profile'

const route = useRoute()
const profileStore = useProfileStore()

const project = computed(() => {
  const id = route.params.id as string
  return profileStore.getProjectById(id)
})

// SEO
useHead({
  title: project.value ? `${project.value.title} - 项目详情` : '项目未找到',
  meta: [
    { 
      name: 'description', 
      content: project.value 
        ? `查看${project.value.title}的详细信息和项目业绩` 
        : '项目未找到' 
    }
  ]
})
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
