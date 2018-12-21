# Interstellar Test

# Outline
Create a modern & interactive SPA that showcases a full-screen map that displays defined geo-
json polygons on it. Clicking on them should reveal a panel that shows meta information.

# Features
- :white_check_mark: create a map component and display Berlin as the center [52.520008, 13.404954]

- :white_check_mark: fetch data from the provided frontend-geo.json file
(https://drive.google.com/file/d/1G5bC34-DPL0YWSxfryCu5VfS6a6nwnlu/view)

- :white_check_mark: Display district polygons on the map
apply different colors to the polygons based on the average age of the district

```
<= 40 = #00cb09
<= 42 = #a4cb00
<= 43 = #cb8a00
<= 45 = #cb4f00
<= 50 = #cb0026
```
- :white_check_mark: on polygon click show in an appropriate UI:

```
- name
- population
- average age
- calculated area in square kilometers
- calculated length of the outline of the area in kilometers
```

## Project setup
```
clone git@github.com:RenatoRJF/interstellar-test.git
cd interstellar-test
yarn install or npn install

```

### Running
```
yarn serve or npm run serve
```

