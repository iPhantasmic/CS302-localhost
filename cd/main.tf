variable "HOST" {
  type = string
}

variable "PORT" {
  type = string
}

variable "DB_USER" {
  type = string
}

variable "DB_PASSWORD" {
  type = string
}

variable "DB_HOST" {
  type = string
}

variable "DB_PORT" {
  type = string
}

variable "DB_SCHEMA" {
  type = string
}

resource "aws_ecs_task_definition" "bookings-service" {
  family = "bookings-service"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory = "1024"
  cpu = "512"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "bookings-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/bookings:latest"
      cpu = 512
      memory = 1024
      essential = true
      portMappings = [{
        containerPort = 50051
        hostPort = 50051
      }]
      environment = [
        { name = "HOST", value = var.HOST },
        { name = "PORT", value = var.PORT },
        { name = "DB_USER", value = var.DB_USER },
        { name = "DB_PASSWORD", value = var.DB_PASSWORD },
        { name = "DB_HOST", value = var.DB_HOST },
        { name = "DB_PORT", value = var.DB_PORT },
        { name = "DB_SCHEMA", value = var.DB_SCHEMA }
      ]
      logConfiguration = {
        "logDriver" = "awslogs",
        options = {
          "awslogs-create-group": "true",
          "awslogs-group": "awslogs-bookings",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "awslogs-bookings"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "bookings-service" {
  name = "bookings-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302"
  task_definition = aws_ecs_task_definition.bookings-service.arn
  launch_type = "FARGATE"
  network_configuration {
    subnets = ["subnet-09d7fd774d9d85fc9"]
    assign_public_ip = true
  }
  desired_count = 1
}