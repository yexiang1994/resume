const resume = {
  name: "叶翔",
  role: "自动化开发工程师",
  profile: "工业自动化 / 上位机 / 机器视觉 / PLC 控制 / 机器人协同",
  greeting: "你好,我是",
  positioning:
    "具备前端、移动端、工业上位机与自动化系统集成复合背景，近年聚焦非标自动化、机器视觉、PLC 控制、机器人协同和现场数据对接。熟悉从需求梳理、技术选型、程序开发、部署交付到现场联调的完整项目流程，能够打通控制层、应用层与数据层，推动项目稳定落地。",
  heroImage: "./img/avator.png",
  projectImages: [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  ],
  contact: [
    { label: "电话", value: "18487199921" },
    { label: "邮箱", value: "962010454@qq.com" },
    { label: "户籍", value: "陕西安康" },
    { label: "学历", value: "本科 / 云南农业大学" },
  ],
  highlights: [
    { value: "9 年", label: "开发与交付经验" },
    { value: "5 类", label: "控制 / 视觉 / 上位机 / 数据 / 机器人" },
    { value: "5 项", label: "自动化与上位机项目沉淀" },
    { value: "4h → 1h", label: "系统部署交付提效" },
  ],
  evidence: [
    "主导或参与工业现场项目从需求梳理、技术选型、程序开发、部署交付到现场联调的闭环。",
    "能拆分 PLC、视觉、机械臂、上位机、本地数据和 MES / 服务器链路，并用 Docker / Git / Clonezilla 管理部署。",
    "熟悉 AI 辅助开发流程，可用于本地知识库搭建、功能插件开发、代码生成和开发提效。",
  ],
  systemFlow: [
    { key: "PLC", title: "控制层", detail: "西门子 S7-1200 / 汇川 PLC / SCL / LAD / ST / LD" },
    { key: "Vision", title: "视觉层", detail: "OpenCV 模板匹配 / 海康 VisionMaster / 多相机检测" },
    { key: "Robot", title: "执行层", detail: "ABB / 汇川机械臂 / 7 轴组装 / 抓取搬运" },
    { key: "App", title: "上位机", detail: "Flutter Desktop / Android 原生 / 现场交互" },
    { key: "Data", title: "数据层", detail: "本地存储 / Java + MongoDB / MES / 客户服务器" },
  ],
  skills: [
    {
      title: "自动化控制",
      items: ["西门子 S7-1200", "SCL/LAD", "汇川 PLC", "ST/LD", "EtherCat", "Profinet", "Modbus TCP/485 通讯"],
    },
    {
      title: "上位机与视觉",
      items: ["Flutter 跨平台开发", "Android 开发", "OpenCV 模板匹配", "海康 VisionMaster", "工业上位机界面", "业务流程与本地数据存储开发"],
    },
    {
      title: "机器人与集成",
      items: ["ABB 机器人", "汇川机械臂协同控制", "PLC / 视觉 / 机械臂 / MES / 服务器集成联调"],
    },
    {
      title: "系统与工具",
      items: ["Linux Ubuntu", "Docker", "Git", "Clonezilla", "系统镜像部署", "版本管理", "模块化打包", "现场环境统一"],
    },
    {
      title: "工程效能",
      items: ["AI 辅助开发流程", "本地知识库搭建", "功能插件开发", "代码生成", "开发提效"],
    },
  ],
  projectBullets: [
    "流水线物料组装搬运：VisionMaster 定位 + TCP 坐标传输 + 汇川机械臂抓取装配 + MES 数据对接。",
    "五轴上下料：S7-1200 控制来料检测、动作联锁、节拍控制、异常报警和现场调试。",
    "CCD 视觉检测：Flutter 上位机 + OpenCV 模板匹配 + Docker 部署 + 双层数据存储追溯。",
    "智能钥匙柜：Android 设备端 + 人脸识别 / 扫码枪 / RFID + Java MongoDB 后端对接。",
    "千里眼：Flutter 移动端与 Web 协同，实现异常上报、报表汇总和邮件通知。",
  ],
  projects: [
    {
      company: "自动化项目",
      name: "流水线物料组装搬运",
      period: "2025.12 - 2026.05",
      tags: ["VisionMaster", "TCP", "汇川机械臂", "7 轴组装", "MES 对接"],
      overview:
        "基于皮带输送、视觉定位、机械臂抓取与转盘协同的自动化组装搬运项目。物料到位后由海康 VisionMaster 进行模板匹配定位，并通过 TCP 将坐标发送给汇川机械臂完成抓取、装配与搬运。",
      responsibilities:
        "独立负责项目自动化开发流程、架构规划与技术选型；完成上位机视觉模板匹配、汇川机械臂取件逻辑、汇川 7 轴组装控制开发；规划 PLC、视觉、机械臂与 MES 之间的通讯方式，并完成本地数据与客户 MES 系统对接；结合本地知识库与 AI 辅助开发方式，加快项目迭代与问题定位。",
      outcome:
        "实现工件识别、精准定位、自动抓取与组装联动，提升产线自动化程度与组装效率；完成产量数据联网与实时展示，支持远程查看生产状态与灵活排产。",
    },
    {
      company: "自动化项目",
      name: "五轴上下料",
      period: "2025.08 - 2025.09",
      tags: ["S7-1200", "多轴协同", "联锁控制", "异常报警", "AI 知识库"],
      overview:
        "上游皮带将工件输送至工作区，接近开关检测来料后，设备通过多轴协同完成取料与放料，并输送至下游工位。",
      responsibilities:
        "独立负责项目自动化开发流程与架构规划，基于西门子 S7-1200 完成五轴上下料设备控制程序开发，包含来料检测、动作联锁、节拍控制、异常报警与现场调试；结合 AI 本地知识库，对项目资料进行关键信息提取与复用，提升开发和迭代效率。",
      outcome: "完成五轴设备稳定控制与上下游衔接，提升取放料流程稳定性和开发效率，为后续功能扩展与项目复用打下基础。",
    },
    {
      company: "深圳三航物联科技有限责任公司",
      name: "CCD 视觉检测",
      period: "2023.12 - 2025.06",
      tags: ["Flutter", "OpenCV", "Docker", "Clonezilla", "追溯数据"],
      overview:
        "工人扫码录入钣金编号后放置到皮带，系统触发多相机拍照，对螺钉螺帽、沉孔、丝印字符等进行模板匹配和检测；检测结果本地精简存储，并将完整数据上传工厂本地服务器，实现追溯查询。",
      responsibilities:
        "负责上位机开发流程规划，以及下位机、本地数据、远端服务器之间的数据流设计；使用 Flutter 开发上位机界面，集成 OpenCV 模板匹配算法并完成本地数据存储开发；对算法和功能模块进行拆分，使用 Docker 容器化打包部署；通过 Git 进行版本管理，并在 Ubuntu 环境下结合 Clonezilla 完成统一系统镜像部署与升级方案设计。",
      outcome:
        "有效降低混料、错料及漏检风险，提升产品出货质量稳定性；建立检测数据本地与服务器双层存储机制，实现产品数据可追溯、可查询；通过模块化部署与统一环境方案，提升系统容错能力并降低现场升级维护成本。",
    },
    {
      company: "深圳三航物联科技有限责任公司",
      name: "智能钥匙柜",
      period: "2022.03 - 2023.05",
      tags: ["Android", "人脸识别", "RFID", "Java", "MongoDB"],
      overview:
        "面向车辆钥匙管理场景的智能设备项目。用户通过人脸识别查询当日工单并领取绑定钥匙，工单完成后归还钥匙，系统自动更新线上工单状态，实现派车、用车、还车全流程数字化管理。",
      responsibilities:
        "负责上位机功能规划、多版本兼容与客户数据平台对接统筹；使用 Android 开发设备端上位机程序，集成人脸识别、扫码枪与超高频 RFID 读取器等功能；使用 Java + MongoDB 开发后端接口，并完成与客户数据平台的数据联动。",
      outcome: "实现车辆管理与业务平台绑定，打通派车、取钥匙、还钥匙与工单状态更新流程，推动客户车辆管理向智能化、数字化转型。",
    },
    {
      company: "深圳三航物联科技有限责任公司",
      name: "千里眼",
      period: "2020.04 - 2022.05",
      tags: ["Flutter", "Android", "iOS", "Web", "报表邮件"],
      overview:
        "面向现场排工排产、异常上报与质量追踪的移动端与 Web 协同系统。现场人员可对异常工件进行按钮触发上报、图片拍照及问题描述提交，系统自动汇总生成不良报表并邮件发送给管理人员。",
      responsibilities:
        "参与移动端和 Web 端技术架构选型及开发规划；使用 Flutter 进行移动端开发，兼容 Android 与 iOS 并完成应用上架；针对应用稳定性、多平台兼容性及客户使用便捷性进行优化。",
      outcome: "帮助客户实现排工排产与异常数据上报数字化，提高现场质量监测效率和管理透明度。",
    },
  ],
  experience: [
    {
      company: "深圳三航物联科技有限责任公司",
      period: "2020.04 - 2025.06",
      role: "软件开发 / 上位机开发 / 项目开发负责人",
      content:
        "负责工业现场相关项目的软件开发与系统集成工作，包含 Flutter / Android 上位机开发、视觉检测系统、现场数据采集、服务器接口对接、项目部署交付与客户现场问题处理。参与并负责千里眼、智能钥匙柜、CCD 视觉检测等项目的方案规划、开发实施和持续优化。",
    },
    {
      company: "深圳合恩众旺公司",
      period: "2018.09 - 2020.03",
      role: "前端开发工程师",
      content: "使用 React、React Native、Flutter 等技术参与 Web 前端和移动端项目开发，负责页面功能实现、交互优化、接口联调和多端适配，积累了移动端与跨平台应用开发经验。",
    },
    {
      company: "昆明卓码信息技术有限公司",
      period: "2017.06 - 2018.07",
      role: "前端开发工程师",
      content: "使用 Vue、HTML、JavaScript 等技术参与 Web 前端开发，负责页面开发、基础交互实现、接口数据渲染和前端问题修复，完成从学校到企业项目开发的实践积累。",
    },
  ],
  evaluation: [
    "具备前端、移动端、上位机、视觉检测和 PLC 自动化控制的复合开发经历，能够理解软件系统与工业现场设备之间的协同关系。",
    "有较强的项目落地意识，能够围绕需求分析、方案规划、技术选型、开发实现、现场联调和交付维护持续推进。",
    "重视系统稳定性、可维护性和可复用性，熟悉 Linux、Docker、Git、Clonezilla 等工具在工业现场部署和版本管理中的应用。",
    "学习能力强，能够将 AI 辅助开发、本地知识库和模块化开发方法应用到实际项目中，提升资料理解、代码开发和问题定位效率。",
  ],
};

window.resumeData = { resume };
