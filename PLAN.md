# Awesome Reader - 项目规划

> 一个聚合 GitHub 上各类 awesome-list 的阅读网站，提供比直接浏览 Markdown 更好的阅读体验。

## 技术选型

| 类别 | 选择 | 说明 |
|------|------|------|
| 框架 | Next.js 14 (App Router) | SSG 静态生成，SEO 友好 |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS | 快速开发，响应式设计 |
| 数据来源 | GitHub API + Raw Markdown | 构建时抓取并解析 |
| 部署 | Vercel | 与 Next.js 深度集成，免费额度充足 |

## 核心功能

1. **首页** — 展示所有已收录的 awesome-list，按分类（编程语言、框架、工具等）组织
2. **列表详情页** — 将 awesome-list 的 markdown 解析为结构化内容，分类侧边栏导航
3. **搜索** — 在单个列表内或跨列表全局搜索项目
4. **更好的阅读体验** — 卡片式展示条目、分类折叠/展开、锚点定位、面包屑导航

## 首批收录列表（10 个热门列表）

| 列表 | 仓库 |
|------|------|
| Awesome Python | vinta/awesome-python |
| Awesome Go | avelino/awesome-go |
| Awesome JavaScript | sorrycc/awesome-javascript |
| Awesome React | enaqx/awesome-react |
| Awesome Vue | vuejs/awesome-vue |
| Awesome Rust | rust-unofficial/awesome-rust |
| Awesome Java | akullpp/awesome-java |
| Awesome TypeScript | dzharii/awesome-typescript |
| Awesome Node.js | sindresorhus/awesome-nodejs |
| Awesome Swift | matteocrippa/awesome-swift |

---

## 分阶段任务

### Phase 1: 项目初始化

- [ ] 使用 `create-next-app` 初始化 Next.js 项目（TypeScript + Tailwind CSS + App Router）
- [ ] 配置项目结构（src/app, src/lib, src/components, src/types 等）
- [ ] 配置 ESLint 和 Prettier
- [ ] 添加 README.md

### Phase 2: 数据层

- [ ] 定义数据模型（AwesomeList, Category, Entry 等 TypeScript 类型）
- [ ] 实现 GitHub Raw 文件抓取工具（获取 awesome-list 的 README.md 原始内容）
- [ ] 实现 Markdown 解析器（将 awesome-list 的 markdown 解析为结构化数据）
  - 解析 `## Category` 标题为分类
  - 解析 `### Subcategory` 为子分类
  - 解析 `- [Name](url) - Description` 为条目
  - 处理嵌套条目（缩进的子条目）
  - 提取斜体分类描述（`_description_`）
- [ ] 创建 awesome-list 注册表配置文件（收录的列表清单及元信息）
- [ ] 实现构建时数据抓取与缓存逻辑

### Phase 3: 页面与核心 UI

- [ ] 全局布局：顶部导航栏 + 响应式框架
- [ ] 首页：列表卡片网格，展示各 awesome-list 的名称、描述、条目数
- [ ] 列表详情页（`/list/[slug]`）：
  - 左侧分类导航侧边栏
  - 右侧条目内容区，按分类分组展示
  - 条目卡片：项目名、链接、描述
- [ ] 分类锚点定位与 URL 同步
- [ ] 移动端响应式适配

### Phase 4: 搜索与筛选

- [ ] 列表内搜索（按项目名/描述过滤）
- [ ] 全局跨列表搜索页面
- [ ] 分类筛选（按类别浏览）

### Phase 5: 体验优化

- [ ] 暗色模式支持
- [ ] SEO 优化（meta 标签、Open Graph、sitemap）
- [ ] 页面加载性能优化（图片懒加载等）
- [ ] 404 页面与错误处理

### Phase 6: 部署与运维

- [ ] Vercel 部署配置
- [ ] GitHub Actions 定时构建（每日自动更新数据）
- [ ] 完善 README 文档
