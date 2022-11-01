resource "aws_ecs_task_definition" "reviews-service" {
  family = "reviews-service"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory = "1024"
  cpu = "512"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "reviews-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/reviews:latest"
      cpu = 512
      memory = 1024
      essential = true
      portMappings = [{
        containerPort = 50051
        hostPort = 50051
      }]
      environment = [
        { name = "PORT", value = "0.0.0.0:50051" },
        { name = "DB_USER", value = "postgres" },
        { name = "DB_PASSWORD", value = "ilovecs302" },
        { name = "DB_HOST", value = "lclhst-database.c34fol4t5wzq.ap-southeast-1.rds.amazonaws.com" },
        { name = "DB_PORT", value = "5432" },
        { name = "DB_SCHEMA", value = "localhost_reviews" }
      ]
    }
  ])
}

resource "aws_ecs_service" "reviews-service" {
  name = "reviews-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302"
  task_definition = aws_ecs_task_definition.reviews-service.arn
  launch_type = "FARGATE"
  network_configuration {
    subnets = ["subnet-09d7fd774d9d85fc9"]
    assign_public_ip = true
  }
  desired_count = 1
}