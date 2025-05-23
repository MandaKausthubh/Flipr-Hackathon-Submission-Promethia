
package handlers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "backend/services"
)

func HandleTask(c *gin.Context) {
    taskIDStr := c.PostForm("id")
    taskID, err := strconv.Atoi(taskIDStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    services.TaskQueue <- taskID // Send to worker pool
    c.JSON(http.StatusOK, gin.H{"status": "Task queued", "taskID": taskID})
}
