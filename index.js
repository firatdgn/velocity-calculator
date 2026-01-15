const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')


// parse various different custom JSON types as JSON
app.use(bodyParser.json())
/**
 * Calculates the sum of 3D Euclidean distances
 * between consecutive coordinate points.
 *
 * @param {Array<{x: number, y: number, z: number}>} points
 * @returns {number}
 */
function sum3DEuclideanDistances(points) {
  if (!Array.isArray(points) || points.length < 2) {
    return 0;
  }

  let sum = 0;

  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const dz = points[i].z - points[i - 1].z;

    sum += Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  return sum;
}

app.post('/', (req, res) => {
    try{
    console.log(req.body)
    const coordinates = req.body.coordinates
    let distance = 0;
    for(let i=1;i< coordinates.length;i++) {
        distance+=sum3DEuclideanDistances([coordinates[i-1], coordinates[i]])
    }
    distance= parseFloat(distance.toFixed(2))
    const speed = parseFloat((distance/(coordinates[coordinates.length - 1].timestamp - coordinates[0].timestamp)).toFixed(2))
    const timeDiff = coordinates[coordinates.length - 1].timestamp - coordinates[0].timestamp
    const velocity = {
        x: (coordinates[coordinates.length - 1].x - coordinates[0].x) / timeDiff,
        y: (coordinates[coordinates.length - 1].y - coordinates[0].y) / timeDiff,
        z: (coordinates[coordinates.length - 1].z - coordinates[0].z) / timeDiff 
    }
    res.json({
        distance,
        speed,
        velocity
    })
    }
    catch (e){
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
