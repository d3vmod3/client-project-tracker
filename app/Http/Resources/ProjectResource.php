<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $project = $this->resource;

        return [
            'id' => $project->id,
            'clientName' => $project->client_name,
            'projectName' => $project->project_name,
            'description' => $project->description,
            'status' => $project->status->value,
            'priority' => $project->priority->value,
            'startDate' => $project->start_date?->format('Y-m-d'),
            'dueDate' => $project->due_date?->format('Y-m-d'),
        ];
    }
}
