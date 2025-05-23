package main

import (
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
    // "github.com/gin-gonic/gin"
    "backend/router"
    "backend/services"
)

func main() {
    r := router.SetupRouter()

    // Start worker pool
    services.StartWorkerPool(5)

    srv := &http.Server{
        Addr:    ":8080",
        Handler: r,
    }

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("listen: %s\n", err)
        }
    }()
    log.Println("Server running on http://localhost:8080")

    // Graceful shutdown
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("Server forced to shutdown:", err)
    }

    log.Println("Server exiting")
}
