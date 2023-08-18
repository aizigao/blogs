const axios = require('axios')
const fs = require("fs");
const path = require("path");
const xmlParser = require("xml-parser");
const crypto = require('crypto')
const ppp = require('./ppppp')

// 根据自己的情况进行配置
const config = {
  username: "aizigao", // GitHub 用户名
  token: ppp.token, // GitHub Token
  repo: "blogs", // 存放 issues的git仓库
  sitemapUrl: path.resolve(__dirname, "./public/sitemap.xml"),
};

axios.defaults.headers = {
  "Accept": "application/vnd.github+json",
  "Authorization": `Bearer ${config.token}`,
  "X-GitHub-Api-Version": "2022-11-28",
  'Content-Type': 'application/json',
}

axios.interceptors.request.use((config) => {
  return config
})

let issuesUrl = `https://api.github.com/repos/${config.username}/${config.repo}/issues`;


const delay = (ms) => new Promise(res => setTimeout(res, ms))
/**
 * 获取本地的文件名
 */
const getLocalArticleNames = () => {
  const urls = sitemapXmlReader(config.sitemapUrl);
  const reg = new RegExp(`https?://aizigao.xyz/(\\d+/\\d+/\\d+)/(.*)?/`)
  const urlNames = urls.map(i => {
    const matched = i.match(reg)
    if (matched) {
      return {
        label: genLabelMd("/" + matched[1] + '/' + matched[2] + '/'),
        url: decodeURI(i)
        , name: decodeURIComponent(matched[2])
      }
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

const genLabelMd = (pathLabel) => {
  return crypto.createHash('md5').update(pathLabel, 'utf-8').digest('hex');
}

const main = async () => {
  const remoteIssuesRes = await axios.get(issuesUrl)
  const remoteIssuesNames = remoteIssuesRes.data.map(i => i.title)
  const localIssueNames = getLocalArticleNames()
  console.log('线上issue数', remoteIssuesNames.length)
  console.log('本地文章数', localIssueNames.length)
  const remoteIssuesNameSet = new Set(remoteIssuesNames)

  const notCreateIssues = localIssueNames.filter(i => {
    return !remoteIssuesNameSet.has(i.name)
  })
  // console.log('未创建的issue', notCreateIssues)
  for (let issueName of notCreateIssues) {
    await axios.post(issuesUrl, {
      title: issueName.name,
      body: `
## 欢迎讨论与交流
博客地址：[${issueName.url}](${issueName.url})
      `,
      assignees: [],
      "labels": ["GITALK", issueName.label]
    }).then(() => {
      console.log(`[创建issue] ${issueName.name}`)
    })
      .catch(e => {
        console.log(e.code, e.massage, e.response.data)
      })
    await delay(2000)
  }
}

main()




