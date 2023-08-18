const request = require("request");
const axios = require('axios')
const fs = require("fs");
const path = require("path");
const url = require("url");
const xmlParser = require("xml-parser");
const cheerio = require("cheerio");


// 根据自己的情况进行配置
const config = {
  username: "aizigao", // GitHub 用户名
  token: "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", // GitHub Token
  repo: "blogs", // 存放 issues的git仓库
  sitemapUrl: path.resolve(__dirname, "./public/sitemap.xml"),
  blogSite: `http://aizigao.xyz`
};

axios.defaults.headers = {
  "Accept": "application/vnd.github+json",
  "Authorization": `Bearer ${config.token}`,
  "X-GitHub-Api-Version": "2022-11-28",
  'Content-Type': 'application/json',
}

axios.interceptors.request.use((config) => {
  console.log({ config })
  return config
})

let issuesUrl = `https://api.github.com/repos/${config.username}/${config.repo}/issues`;


/**
 * 获取本地的文件名
 */
const getLocalArticleNames = () => {
  const urls = sitemapXmlReader(config.sitemapUrl);
  const reg = new RegExp(`https?://aizigao.xyz/\\d+/\\d+/\\d+/(.*)?/`)
  const urlNames = urls.map(i => {
    const matched = i.match(reg)
    if (matched) {
      return decodeURIComponent(matched[1])
    }
    return null
  }).filter(i => !!i)
  return urlNames
}


function sitemapXmlReader(file) {
  let data = fs.readFileSync(file, "utf8");
  let sitemap = xmlParser(data);
  return sitemap.root.children.map(function (url) {
    let loc = url.children.filter(function (item) {
      return item.name === "loc";
    })[0];
    return loc.content;
  });
}

const main = async () => {
  const remoteIssuesRes = await axios.get(issuesUrl)
  const remoteIssuesNames = remoteIssuesRes.data.map(i => i.title)
  const localIssueNames = getLocalArticleNames()
  console.log('线上issue数', remoteIssuesNames.length)
  console.log('本地文章数', localIssueNames.length)
  const remoteIssuesNameSet = new Set(remoteIssuesNames)

  const notCreateIssues = localIssueNames.filter(i => {
    return !remoteIssuesNameSet.has(i)
  })
  console.log('未创建的issue', notCreateIssues)
  for (let issueName of notCreateIssues) {
    axios.post(issuesUrl, {
      title: notCreateIssues[0],
      body: "## 欢迎讨论与交流",
      assignees: [],
      "labels": ["GITALK"]
    }).then(() => {
      console.log(`[创建issue] ${issueName}`)
    })
      .catch(e => {
        console.log(e.code, e.massage, e.response.data)
      })
  }
}

main()




