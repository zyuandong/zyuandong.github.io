---
title: Skills
date: 2021-04-30
---

## 基础

{% for skill in site.data.skills.base %}
  {{ skill.key }}: {{ skill.value }}
{% endfor %}

## 框架

{% for skill in site.data.skills.frame %}
  {{ skill.key }}: {{ skill.value }}
{% endfor %}

## 工程化相关

{% for skill in site.data.skills.aboutEngineering %}
  {{ skill.key }}: {{ skill.value }}
{% endfor %}

## 可视化

{% for skill in site.data.skills.visualization %}
  {{ skill.key }}: {{ skill.value }}
{% endfor %}
