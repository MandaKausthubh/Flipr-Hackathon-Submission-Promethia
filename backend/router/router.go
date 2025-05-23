package router

import (
    "github.com/gin-gonic/gin"
    "myapp/handlers"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()
    r.POST("/task", handlers.HandleTask)
    return r
}
