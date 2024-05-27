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
            'Sub_Category_id' => 'sometimes|exists:subcategories,id',
            'user_id' => 'sometimes|exists:users,id',
            'cover' => 'nullables|image',
            'description' => 'sometimes|string',
            'media' => 'array',
            'media.*.file' => 'sometimes|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi,flv|max:20480', // Adjust max size as needed
            'media.*.description' => 'sometimes|string',
            'media.*.order' => 'sometimes|integer',
        ];
    }
}
