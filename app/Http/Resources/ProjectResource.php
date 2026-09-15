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
        return [
            'id' => $this->id,
            'clientName' => $this->client_name,
            'projectName' => $this->project_name,
            'description' => $this->description,
            'status' => $this->status->value,
            'priority' => $this->priority->value,
            'startDate' => $this->start_date?->format('Y-m-d'),
            'dueDate' => $this->due_date?->format('Y-m-d'),
        ];
    }
}