<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
            'adresse' => $this->adresse,
            'role_id' => $this->role_id,
            'level_id' => $this->level_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // You might want to also include any relationships, like role details
            'role' => new RoleResource($this->whenLoaded('role')),
            'level' => new LevelResource($this->whenLoaded('level')),
        ];
    }
}
