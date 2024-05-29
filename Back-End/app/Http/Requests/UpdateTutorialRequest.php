<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre' => 'sometimes|string|max:255',
            'Sub_Categorie_id' => 'sometimes|exists:subcategories,id',
            'user_id' => 'sometimes|exists:users,id',
            'description' => 'sometimes|string',
            'cover' => 'nullable|image',
            'media.*.file' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi,flv|max:20480',
            'media.*.description' => 'nullable|string|max:255',
            'media.*.order' => 'sometimes|integer',
        ];
        
    }
}
