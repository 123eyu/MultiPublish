export function publishUploadTimeout(platform: string) {
  return ["douyin", "toutiao", "weixin"].includes(platform) ? 600000 : 180000;
}

export function backendTitleCandidates(platform: string, title: string) {
  if (platform === "weixin" || platform === "bilibili") return [title];
  // 抖音作品管理列表会完整渲染标题（自动化输入即 ≤30 字整题），且同一账号
  // 常有“今日开源热点趋势项目推荐：XXX”这类同前缀系列旧作：短前缀候选会
  // 命中旧作造成假“发布成功”（2026-10-25 microduck 实证：页面全文无
  // microduck，但 12 字前缀命中 8 处旧作），因此抖音只允许整题匹配。
  if (platform === "douyin") return [title];
  return [title, ...[24, 20, 16, 12].map((limit) => Array.from(title).slice(0, limit).join(""))]
    .filter((value) => value.length >= 2);
}
