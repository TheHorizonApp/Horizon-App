package aws_prof_imgs

import (
	"bytes"
	"context"
	"os"
	"encoding/json"
	"net/http"
	"fmt"
	"path/filepath"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

// S3Uploader provides methods to upload images to AWS S3.
type S3Uploader struct {
	s3Client *s3.S3
	bucket   string
}
type Credentials struct {
	AWS_REGION 				string `json:"AWS_REGION"`
	AWS_ACCESS_KEY_ID   	string `json:"aws_access_key_id"`
	AWS_SECRET_ACCESS_KEY 	string `json:"aws_secret_access_key"`

}

func loadCredentials() (*Credentials, error) {

	absPath, err := filepath.Abs("../creds.json")
    if err != nil {
        return nil, fmt.Errorf("failed to get absolute path for creds.json: %v", err)
    }
	file, err := os.Open(absPath)
	if err != nil {
		return nil, fmt.Errorf("failed to open creds.json: %v", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	creds := &Credentials{}
	err = decoder.Decode(creds)
	if err != nil {
		return nil, fmt.Errorf("failed to decode creds.json: %v", err)
	}

	return creds, nil
}
// NewS3Uploader creates a new S3Uploader instance.
func NewS3Uploader(bucket string) (*S3Uploader, error) {

	creds, err := loadCredentials()
	if err != nil {
		return nil, err
	}

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(creds.AWS_REGION),
		Credentials: credentials.NewStaticCredentials(creds.AWS_ACCESS_KEY_ID, creds.AWS_SECRET_ACCESS_KEY, " "),
	})
	if err != nil {
		return nil, err
	}

	s3Client := s3.New(sess)

	return &S3Uploader{
		s3Client: s3Client,
		bucket:   bucket,
	}, nil
}

func (upload *S3Uploader) UploadPicture(ctx context.Context, pictureData []byte, contentType string, key string) error {
	buffer := bytes.NewReader(pictureData)

	if contentType == "" {
		contentType = http.DetectContentType(pictureData)
	}

	_, err := upload.s3Client.PutObjectWithContext(ctx, &s3.PutObjectInput{
		Bucket:	aws.String(upload.bucket),
		Key:	aws.String(key),
		Body: 	buffer,
		ContentType: aws.String(contentType),
	})
	if err != nil{
		return err
	}

	return nil
}