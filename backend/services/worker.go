package services

import (
    "fmt"
    "time"
)

var TaskQueue = make(chan int, 100)

func StartWorkerPool(numWorkers int) {
    for i := 0; i < numWorkers; i++ {
        go worker(i)
    }
}

func worker(id int) {
    for taskID := range TaskQueue {
        fmt.Printf("Worker %d processing task %d\n", id, taskID)
        time.Sleep(2 * time.Second) // Simulate task
        fmt.Printf("Worker %d finished task %d\n", id, taskID)
    }
}
