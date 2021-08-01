---
title: Jekyll 系列（四）：Pagination
category: 随笔
tags: [Jekyll]
last_modified_date: 2021-05-25
---

当博客中的文章达到一定数量时，就会需要分页展示文章列表。

刚开始我想通过 Jekyll 自身提供的能力去实现；或者和实现 Category、Tag 交互一样，自己准备文章列表数据，再通过发起 HTTP 请求的方式切换分页数据，但最终都不是解决问题最理想的办法。

不过也不是没有收获，在 Jekyll 文档中就提到了，可以使用插件 jekyll-paginate 来实现分页功能，并且此插件是被 GitHub Pages 所支持的。🚀

## 开启分页功能

接下来，就尝试使用 jekyll-paginate 来实现博客的分页功能。

### 安装 jekyll-paginate

在本地开发环境中，首先需要安装 jekyll-paginate。因为 jekyll-paginate 和 Jekyll 一样是 Ruby 的 gem 包，因此安装方式也一样：

`gem install jekyll-paginate`

使用命令 `gem list` 可以查看已安装的 gem 包列表，包含 jekyll-paginate 则代表安装成功。

### 配置

需要让 jekyll-paginate 生效，还需要在 _config.yml 中加一些配置:

```yaml
# Pagination
paginate: 10
paginate_path: 'home/page:num'
```

其中的 `paginate: 10` 是设置每页展示文章数目；`paginate_path: "home/page:num"` 是设置分页页面的路径，当然具体路径应根据实际路径设计自行修改。

配置完成后，Jekyll 就能根据配置，将 1-10 篇文章分配到 home 路径下；11-20 篇文章分配到 home/page2 路径下，以此类推。

❗**注：这里细心地话应该能发现，分页路径并没有 home/page1，而是直接从 2 开始**

如果是将 Jekyll 源项目资源部署到 GitHub Pages 中，那还需要在 _config.yml 中添加一段配置：

```yaml
# Plugins
plugins:
  - jekyll-paginate
```

这是用来告诉 GitHub Pages，此项目使用了插件 jekyll-paginate，这样分页功能才能生效。

## 生成分页界面

准备工作完成后，剩下的就是需要实现页面中的分页按钮，点击按钮能够跳转到指定的分页页面。

### 了解 paginator 对象

不过在此之前，先了解一下插件 jekyll-paginate 引入的 paginator 对象：

| 属性                           | 描述                       |
| :----------------------------- | :------------------------- |
| `pagiantor.page`               | 当前页码                   |
| `paginator.per_page`           | 每页文章数量               |
| `paginator.posts`              | 当前页的文章数量           |
| `paginator.total_posts`        | 总文章数                   |
| `paginator.total_pages`        | 总页数                     |
| `paginator.previous_page`      | 上一页页码，不存在则无输出 |
| `paginator.previous_page_path` | 上一页路径，不存在则无输出 |
| `paginator.next_page`          | 下一页页码，不存在则无输出 |
| `paginator.next_page_path`     | 下一页路径，不存在则无输出 |

### 最终代码实现

{% raw %}

```liquid
{% assign current_page = page.url | split: "/" | last %}
{% if current_page contains 'page' %}
  {% assign current_page = current_page | remove: "page" | abs %}
{% else %}
  {% assign current_page = 1 %}
{% endif %}

{% assign total_pages = paginator.total_pages %}
{% assign pager_count = 5 %}
{% assign half_pager_count = pager_count | minus: 1 | divided_by: 2 | abs %}
{% assign pagers = "" | split: "" %}

{% assign show_prev_more = false %}
{% assign new_prev_page = 1 %}
{% assign show_next_more = false %}
{% assign new_next_page = total_pages %}

{% if total_pages > pager_count %}
  {% assign res = pager_count | minus: half_pager_count %}
  {% if current_page > res %}
    {% assign show_prev_more = true %}
    {% assign new_prev_page = current_page | minus: pager_count | plus: 2 %}
    {% if new_prev_page < 1 %}
      {% assign new_prev_page = 1 %}
    {% endif %}
  {% endif %}

  {% assign res = total_pages | minus: half_pager_count %}
  {% if current_page < res %}
    {% assign show_next_more = true %}
    {% assign new_next_page = current_page | plus: pager_count | minus: 2 %}
    {% if new_next_page > total_pages %}
      {% assign new_next_page = total_pages %}
    {% endif %}
  {% endif %}
{% endif %}

{% if show_prev_more == true and show_next_more == false %}
  {% assign start = total_pages | minus: pager_count | plus: 2 %}
  {% assign end = total_pages | minus: 1 %}
  {% for n in (start..end) %}
    {% assign pagers = pagers | push: n %}
  {% endfor %}
{% elsif show_prev_more == false and show_next_more == true %}
  {% assign end = pager_count | minus: 1 %}
  {% for n in (2..end) %}
    {% assign pagers = pagers | push: n %}
  {% endfor %}
{% elsif show_prev_more == true and show_next_more == true %}
  {% assign offset = pager_count | minus: 3 | divided_by: 2 %}
  {% assign start = current_page | minus: offset %}
  {% assign end = current_page | plus: offset %}
  {% for n in (start..end) %}
    {% assign pagers = pagers | push: n %}
  {% endfor %}
{% else %}
  {% assign end = total_pages | minus: 1 %}
  {% for n in (2..end) %}
    {% assign pagers = pagers | push: n %}
  {% endfor %}
{% endif %}

<div id="pagination" style="text-align: center;">
  <span class="total text-tip">{{ site.posts | size }} Posts</span>

  <span class="pagination-box">
    {% if paginator.previous_page %}
      {% if paginator.previous_page == 1 %}
      <a href="{{ site.baseurl }}/home" class="previous">
        <i class="icon-chevron-left"></i>
      </a>
      {% else %}
      <a href="{{ site.baseurl }}/home/page{{ paginator.previous_page }}" class="previous">
        <i class="icon-chevron-left"></i>
      </a>
      {% endif %}
    {% else %}
      <span class="previous btn-not-allowed cursor-not-allowed">
        <i class="icon-chevron-left"></i>
      </span>
    {% endif %}

    <a href="{{ site.baseurl }}/home" class="number {% unless paginator.previous_page %}is-active{% endunless %}">1</a>

    {% if show_prev_more == true %}
      {% if new_prev_page == 1 %}
      <a href="{{ site.baseurl }}/home" class="number prev-page">
        <span>...</span>
        <i class="icon-chevrons-left"></i>
      </a>
      {% else %}
      <a href="{{ site.baseurl }}/home/page{{ new_prev_page }}" class="number prev-page">
        <span>...</span>
        <i class="icon-chevrons-left"></i>
      </a>
      {% endif %}
    {% endif %}

    {% for n in pagers %}
    <a href="{{ site.baseurl }}/home/page{{ n }}" class="number {% if page.url contains n %}is-active{% endif %}">{{ n }}</a>
    {% endfor %}

    {% if show_next_more == true %}
    <a href="{{ site.baseurl }}/home/page{{ new_next_page }}" class="number next-page">
      <span>...</span>
      <i class="icon-chevrons-right"></i>
    </a>
    {% endif %}

    <span class="mobile-page-number text-tip only-sm">{{ paginator.page }} / {{ paginator.total_pages }}</span>

    {% unless total_pages == 1 %}
    <a href="{{ site.baseurl }}/home/page{{ total_pages }}" class="number {% unless paginator.next_page %}is-active{% endunless %}">{{ total_pages }}</a>
    {% endunless %}

    {% if paginator.next_page %}
    <a href="{{ site.baseurl }}/home/page{{ paginator.next_page }}" class="next">
      <i class="icon-chevron-right"></i>
    </a>
    {% else %}
    <span class="next btn-not-allowed cursor-not-allowed">
      <i class="icon-chevron-right"></i>
    </span>
    {% endif %}
  </span>

  <span class="page-number text-tip">{{ paginator.page }} / {{ paginator.total_pages }}</span>
</div>
```

{% endraw %}
