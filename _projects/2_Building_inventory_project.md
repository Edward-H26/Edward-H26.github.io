---
name: Illinois State Buildings Analysis
tools: [Python, Altair, vega-lite, Pandas]
image: assets/pngs/buildings.png
description: Interactive analysis of Illinois state building inventory with temporal-size patterns and usage distribution across counties
custom_js:
  - vega.min
  - vega-lite.min
  - vega-embed.min
  - justcharts
---

# Illinois State Buildings Interactive Analysis

This project presents an interactive exploration of Illinois state building inventory data, analyzing over 8,500 buildings across temporal, spatial, and categorical dimensions.

## Visualization 1: Temporal-Size Analysis with Category Distribution

This interactive scatter plot and histogram combination allows you to explore the relationship between building age, size, and agency category. **Drag to select** buildings on the scatter plot to filter the histogram on the right.

<vegachart schema-url="{{ site.baseurl }}/assets/json/buildingAgeAndSizeAnalysis.json" style="width: 100%"></vegachart>

### Write Up

xxx

## Visualization 2: Usage Type and Geographic Distribution

Click on any usage type to filter the county distribution and explore how different building types are distributed across Illinois' top 20 counties.

<vegachart schema-url="{{ site.baseurl }}/assets/json/buildingUsageTypeAndLocationAnalysis.json" style="width: 100%"></vegachart>

### Write Up

xxx

## Data & Methods

The analysis uses the Illinois state building inventory dataset, which includes detailed information about location, construction year, size, usage, and managing agencies.

<div class="left">
{% include elements/button.html link="https://raw.githubusercontent.com/UIUC-iSchool-DataViz/is445_data/main/building_inventory.csv" text="The Data" %}
</div>

<div class="right">
{% include elements/button.html link="" text="The Analysis" %}
</div>

