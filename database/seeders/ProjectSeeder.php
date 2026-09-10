<?php

namespace Database\Seeders;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'client_name' => 'Acme Corporation',
            'project_name' => 'Corporate Website Redesign',
            'description' => "Redesign and modernize the company's corporate website.",
            'status' => ProjectStatus::InProgress,
            'priority' => ProjectPriority::High,
            'start_date' => '2026-06-01',
            'due_date' => '2026-07-15',
        ]);

        Project::create([
            'client_name' => 'GreenLeaf Cafe',
            'project_name' => 'Online Ordering System',
            'description' => 'Develop an online ordering platform for customers.',
            'status' => ProjectStatus::Planning,
            'priority' => ProjectPriority::Medium,
            'start_date' => '2026-06-10',
            'due_date' => '2026-08-01',
        ]);

        Project::create([
            'client_name' => 'Bright Realty',
            'project_name' => 'Property Listing Portal',
            'description' => 'Build a portal for managing property listings.',
            'status' => ProjectStatus::OnHold,
            'priority' => ProjectPriority::Medium,
            'start_date' => '2026-05-15',
            'due_date' => '2026-07-30',
        ]);

        Project::create([
            'client_name' => 'Nova Fitness',
            'project_name' => 'Mobile App MVP',
            'description' => 'Develop the first version of the fitness tracking app.',
            'status' => ProjectStatus::InProgress,
            'priority' => ProjectPriority::High,
            'start_date' => '2026-06-05',
            'due_date' => '2026-08-20',
        ]);

        Project::create([
            'client_name' => 'Blue Ocean Travel',
            'project_name' => 'Booking Platform Enhancement',
            'description' => 'Improve search and booking functionalities.',
            'status' => ProjectStatus::Completed,
            'priority' => ProjectPriority::Medium,
            'start_date' => '2026-04-01',
            'due_date' => '2026-05-30',
        ]);

        Project::create([
            'client_name' => 'TechVision Solutions',
            'project_name' => 'CRM Dashboard',
            'description' => 'Develop an internal CRM dashboard.',
            'status' => ProjectStatus::Planning,
            'priority' => ProjectPriority::High,
            'start_date' => '2026-06-15',
            'due_date' => '2026-08-15',
        ]);

        Project::create([
            'client_name' => 'Urban Living',
            'project_name' => 'Property Management System',
            'description' => 'Create a platform for managing rental properties.',
            'status' => ProjectStatus::InProgress,
            'priority' => ProjectPriority::Medium,
            'start_date' => '2026-05-20',
            'due_date' => '2026-08-10',
        ]);

        Project::create([
            'client_name' => 'Elite Events',
            'project_name' => 'Event Registration Portal',
            'description' => 'Develop a registration and ticketing portal.',
            'status' => ProjectStatus::Planning,
            'priority' => ProjectPriority::Low,
            'start_date' => '2026-06-20',
            'due_date' => '2026-09-01',
        ]);

        Project::create([
            'client_name' => 'HealthFirst Clinic',
            'project_name' => 'Patient Appointment System',
            'description' => 'Build an appointment scheduling application.',
            'status' => ProjectStatus::Completed,
            'priority' => ProjectPriority::High,
            'start_date' => '2026-03-01',
            'due_date' => '2026-05-01',
        ]);

        Project::create([
            'client_name' => 'MarketPro',
            'project_name' => 'Marketing Campaign Dashboard',
            'description' => 'Track and manage digital marketing campaigns.',
            'status' => ProjectStatus::InProgress,
            'priority' => ProjectPriority::Medium,
            'start_date' => '2026-06-01',
            'due_date' => '2026-07-31',
        ]);

        Project::create([
            'client_name' => 'Sunrise Education',
            'project_name' => 'Learning Management Portal',
            'description' => 'Develop a portal for students and instructors.',
            'status' => ProjectStatus::Planning,
            'priority' => ProjectPriority::High,
            'start_date' => '2026-07-01',
            'due_date' => '2026-09-30',
        ]);

        Project::create([
            'client_name' => 'FreshFarm',
            'project_name' => 'Inventory Management System',
            'description' => 'Track inventory across multiple locations.',
            'status' => ProjectStatus::OnHold,
            'priority' => ProjectPriority::Low,
            'start_date' => '2026-05-01',
            'due_date' => '2026-08-01',
        ]);
    }
}