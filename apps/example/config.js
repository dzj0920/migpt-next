/**
 * @type {import('@mi-gpt/next').MiGPTConfig}
 */
export default {
  debug: true, // 是否开启调试模式
  speaker: {
    /**
     * 小爱音箱在米家中设置的名称
     *
     * 如果提示找不到设备，请打开调试模式获取设备真实的 name、miotDID 或 mac 地址填入
     */
    did: '小爱音箱mini',
    /**
     * 小米 ID（一串数字）
     *
     * 注意：不是手机号或邮箱，请在小米账号「个人信息」-「小米 ID」查看
     */
    userId: '283181252',
    /**
     * 小米账号登录密码
     *
     * 如果提示登录失败，请使用 passToken 登录
     */
    password: 'dzj930920',
    /**
     * （可选）小米账号 passToken
     *
     * 获取教程：https://github.com/idootop/migpt-next/issues/4
     */
    passToken: 'V1:pwROAesIuzMBPe5slLSsQnUb2DpHBc+t6DtAMHLpye9bq66oUqU42OclC/Vx0WLuaKSnZYKK+Urck/q3kgc7Sfh7ZAGYa5xD5rdZ8MjtoOoungWx9BCfJQvgzl0f0UX0mB7IZS5yz4sSIT+FW+fW+1rH0VW+ekDuqgAFwkXcueFpswGgV1d9gy/+Kl0Jtum7+6gZJixIOUwq92SNffXmpj7t65bT8q1V4vvTfaHNKbAT6xysQL3t4m5PwU01KAd7Dhg63nsJMt4FGbG6juI9CQ3XSkBHLk0oEkzybJ7zU7J7JHIMrGZezfhz4MYq88oTQ6Dus86pqdvyMj4BSsDm1g==',
  },
  openai: {
    /**
     * 你的大模型服务提供商的接口地址
     *
     * 支持兼容 OpenAI 接口的大模型服务，比如：DeepSeek V3 等
     *
     * 注意：一般以 /v1 结尾，不包含 /chat/completions 部分
     * - ✅ https://api.openai.com/v1
     * - ❌ https://api.openai.com/v1/（最后多了一个 /
     * - ❌ https://api.openai.com/v1/chat/completions（不需要加 /chat/completions）
     */
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    /**
     * API 密钥
     */
    apiKey: '600ab1ab-5a05-4462-b817-4b31d261846c',
    /**
     * 模型名称
     */
    model: 'ep-20260315144626-zbwf6',
  },
  prompt: {
    /**
     * 系统提示词，如需关闭可设置为：''（空字符串）
     */
    system: '你是一个智能助手，请根据用户的问题给出回答。',
  },
  context: {
    /**
     * 每次对话携带的最大历史消息数（如需关闭可设置为：0）
     */
    historyMaxLength: 10,
  },
  /**
   * 只回答以下关键词开头的消息：
   *
   * - 请问地球为什么是圆的？
   * - 你知道世界上跑的最快的动物是什么吗？
   */
  callAIKeywords: ['请', '你'],
  /**
   * 自定义消息回复
   */
  async onMessage(engine, msg) {
  if (engine.config.callAIKeywords.some((e) => msg.text.startsWith(e))) {
    // 打断原来小爱的回复
    await engine.speaker.abortXiaoAI();
    // 调用 AI 回答
    const { text } = await engine.askAI(msg);
    console.log(`🔊 ${text}`);
    // TTS 播放文字
    await engine.MiOT.doAction(5, 3, text); // 👈 注意把 5,1 换成你的设备 ttsCommand
    return { handled: true };
  }
},
};
